import { sendEmail } from "../utils/emailUtils.js";
import { getTemplate } from "../utils/emailTemplates.js";

import User from "../models/User.js";

/* ======================
ORDER PLACED
====================== */

export const orderPlaced = async (req, res) => {
  try {

    const { userId, orderId, items, total } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const html = getTemplate("orderPlaced.html", {
      name: user.name,
      orderId,
      items,
      total
    });

    await sendEmail(
      user.email,
      "Super Health - Order Placed Successfully",
      html
    );

    res.json({
      success: true,
      message: "Order placed email sent"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


/* ======================
ORDER CONFIRMED
====================== */

export const orderConfirmed = async (req, res) => {

  try {

    const { userId, orderId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const html = getTemplate("orderConfirmed.html", {
      name: user.name,
      orderId
    });

    await sendEmail(
      user.email,
      "Super Health - Order Confirmed",
      html
    );

    res.json({
      success: true,
      message: "Order confirmation email sent"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


/* ======================
ORDER SHIPPED
====================== */

export const orderShipped = async (req, res) => {

  try {

    const { userId, orderId, trackingNumber } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const html = getTemplate("orderShipped.html", {
      name: user.name,
      orderId,
      trackingNumber
    });

    await sendEmail(
      user.email,
      "Super Health - Your Order Has Been Shipped",
      html
    );

    res.json({
      success: true,
      message: "Order shipped email sent"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


/* ======================
ORDER CANCELLED
====================== */

export const orderCancelled = async (req, res) => {

  try {

    const { userId, orderId, reason } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const html = getTemplate("orderCancelled.html", {
      name: user.name,
      orderId,
      reason
    });

    await sendEmail(
      user.email,
      "Super Health - Order Cancelled",
      html
    );

    res.json({
      success: true,
      message: "Order cancelled email sent"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};