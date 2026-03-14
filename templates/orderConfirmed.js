const orderConfirmed = (name, orderId) => {

return `

<h2>Order Confirmed ✅</h2>

<p>Hello ${name},</p>

<p>Your order <b>${orderId}</b> has been confirmed.</p>

<p>Our team is preparing your order for shipment.</p>

<p>We will notify you once it is shipped.</p>

`;

};

export default orderConfirmed;