const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "razorpay_secret_placeholder",
});

// Create Razorpay Order
exports.createRazorpayOrder = async (req, res) => {
  console.log("DIAGNOSTIC: Entering createRazorpayOrder");
  try {
    const { items, totalAmount, shippingAddress } = req.body;
    console.log("DIAGNOSTIC: Payload received:", JSON.stringify(req.body));
    const userId = req.user.id; // From auth middleware

    const options = {
      amount: totalAmount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    let razorpayOrderId = "test_order_" + Date.now();
    let finalAmount = totalAmount * 100;

    try {
      const razorpayOrder = await razorpay.orders.create(options);
      if (razorpayOrder) {
        razorpayOrderId = razorpayOrder.id;
        finalAmount = razorpayOrder.amount;
      }
    } catch (err) {
      console.warn("Razorpay Order Creation Failed (using fallback):", err.message);
    }

    // Create our internal order record
    console.log("DIAGNOSTIC: Creating Order for User:", userId);
    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      shippingAddress,
      razorpayOrderId,
      paymentStatus: "Pending",
    });

    await newOrder.save();
    console.log("DIAGNOSTIC: Order saved successfully:", newOrder._id);

    res.status(201).json({
      success: true,
      orderId: razorpayOrderId,
      amount: finalAmount,
      currency: "INR",
      internalOrderId: newOrder._id,
      isTest: razorpayOrderId.startsWith("test_")
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ 
      message: "Server error creating order", 
      error: error.message
    });
  }
};

// Verify Razorpay Payment
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "razorpay_secret_placeholder")
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment verified
      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          paymentStatus: "Completed",
          orderStatus: "Paid"
        },
        { new: true }
      );

      return res.status(200).json({ message: "Payment verified successfully", order });
    } else {
      return res.status(400).json({ message: "Invalid signature, payment verification failed" });
    }
  } catch (error) {
    console.error("Verify Payment Error:", error);
    res.status(500).json({ message: "Server error verifying payment" });
  }
};

// Get User Orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    res.status(500).json({ message: "Server error fetching orders" });
  }
};

