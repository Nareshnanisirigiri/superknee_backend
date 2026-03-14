import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(10);
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalSales = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    res.json({
      orders,
      totalOrders,
      totalProducts,
      totalUsers,
      totalSales: totalSales[0]?.total || 0
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};