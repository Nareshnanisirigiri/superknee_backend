const orderPlaced = (name, orderId, amount) => {

return `

<h2>Order Placed Successfully 🎉</h2>

<p>Hi ${name},</p>

<p>Your order has been placed successfully.</p>

<p><b>Order ID:</b> ${orderId}</p>

<p><b>Total Amount:</b> ₹${amount}</p>

<p>We will notify you when your order is confirmed.</p>

<p>Thank you for shopping with Super Knee.</p>

`;

};

export default orderPlaced;