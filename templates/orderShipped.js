const orderShipped = (name, orderId, tracking) => {

return `

<h2>Your Order is Shipped 🚚</h2>

<p>Hi ${name},</p>

<p>Your order <b>${orderId}</b> has been shipped.</p>

<p><b>Tracking ID:</b> ${tracking}</p>

<p>You can track your shipment using this ID.</p>

`;

};

export default orderShipped;