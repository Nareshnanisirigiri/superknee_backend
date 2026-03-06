const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

exports.getDashboardStats = async (req, res) => {
  try {

    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const customers = await User.countDocuments({ role: "user" });

    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$price" }
        }
      }
    ]);

    const revenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name");

    res.json({
      totalOrders,
      totalProducts,
      customers,
      revenue,
      recentOrders
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};