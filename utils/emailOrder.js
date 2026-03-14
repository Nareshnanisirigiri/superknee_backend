import { sendEmail } from "./emailUtils.js";
import { getTemplate } from "./emailTemplates.js";

export const orderConfirmationTemplate = (userName, order) => {
  return getTemplate("orderConfirmation.html", {
    userName: userName,
    orderId: order.razorpayOrderId || order._id,
    totalAmount: order.totalAmount,
  });
};

export const orderPlacedTemplate = (userName, order) => {
  return getTemplate("orderPlaced.html", {
    userName: userName,
    orderId: order.razorpayOrderId || order._id,
  });
};

export const orderShippedTemplate = (userName, order, trackingLink) => {
  return getTemplate("orderShipped.html", {
    userName: userName,
    orderId: order.razorpayOrderId || order._id,
    trackingLink: trackingLink
  });
};

export const orderCancelTemplate = (userName, order) => {
  return getTemplate("orderCancel.html", {
    userName: userName,
    orderId: order.razorpayOrderId || order._id,
  });
};

export const sendOrderConfirmationEmail = async (user, order) => {
  const html = orderConfirmationTemplate(user.name, order);
  await sendEmail(user.email, "Super Health - Order Confirmation", html);
};

export const sendOrderPlacedEmail = async (user, order) => {
  const html = orderPlacedTemplate(user.name, order);
  await sendEmail(user.email, "Super Health - Order Placed Successfully", html);
};

export const sendOrderShippedEmail = async (user, order, trackingLink) => {
  const html = orderShippedTemplate(user.name, order, trackingLink);
  await sendEmail(user.email, "Super Health - Your Order has been Shipped", html);
};

export const sendOrderCancelEmail = async (user, order) => {
  const html = orderCancelTemplate(user.name, order);
  await sendEmail(user.email, "Super Health - Order Cancellation", html);
};