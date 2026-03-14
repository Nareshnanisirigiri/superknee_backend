const orderCancelled = (name, orderId) => {

return `

<h2>Order Cancelled ❌</h2>

<p>Hello ${name},</p>

<p>Your order <b>${orderId}</b> has been cancelled.</p>

<p>If you already paid, the refund will be processed soon.</p>

`;

};

export default orderCancelled;