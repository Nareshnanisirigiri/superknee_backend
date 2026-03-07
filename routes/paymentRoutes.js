const express = require("express");
const router = express.Router();
const { createRazorpayOrder, verifyPayment, getUserOrders } = require("../controllers/paymentController");
const { auth } = require("../middleware/authMiddleware"); // Using correct middleware name

router.post("/create-order", auth, createRazorpayOrder);
router.post("/verify-payment", auth, verifyPayment);
router.get("/my-orders", auth, getUserOrders);

module.exports = router;
