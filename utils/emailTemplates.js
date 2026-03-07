/**
 * HTML Templates for Emails
 */

const welcomeTemplate = (userName) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #111; margin: 0; padding: 0; background-color: #f3f3f3; }
        .wrapper { width: 100%; padding: 20px 0; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #ddd; }
        .header { padding: 20px 40px; border-bottom: 5px solid #232f3e; }
        .header img { height: 40px; }
        .content { padding: 40px; }
        .welcome-title { font-size: 24px; font-weight: bold; margin-bottom: 20px; color: #111; }
        .footer { background-color: #ffffff; padding: 20px 40px; border-top: 1px solid #ddd; text-align: left; font-size: 11px; color: #555; }
        .button { display: inline-block; padding: 12px 24px; background-color: #f0c14b; border: 1px solid #a88734; color: #111 !important; text-decoration: none; border-radius: 3px; font-weight: 500; font-size: 14px; margin-top: 20px; box-shadow: 0 1px 0 rgba(255,255,255,.4) inset; }
        .button:hover { background-color: #ebb31a; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <span style="font-size: 24px; font-weight: 900; color: #16a34a;">Super Knee</span>
            </div>
            <div class="content">
                <div class="welcome-title">Hi ${userName}, Welcome to Super Knee!</div>
                <p>We're thrilled to have you join us. Our mission is to provide you with the best support for your movement and recovery.</p>
                <p>You can now log in to your account to track your orders, manage your profile, and receive exclusive updates.</p>
                <a href="https://superkneewebsite.vercel.app/shop" class="button">Start Shopping at Super Knee</a>
                <p style="margin-top: 40px; font-size: 13px;">Warm regards,<br>The Super Knee Team</p>
            </div>
            <div class="footer">
                <p>This email was sent from an email address that can't receive emails. Please don't reply to this email.</p>
                <p>&copy; 2026 Super Knee Support. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>
`;

const orderConfirmationTemplate = (userName, order) => {
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const dateString = deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

  return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #111; margin: 0; padding: 0; background-color: #f3f3f3; }
        .wrapper { width: 100%; padding: 20px 0; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #ddd; }
        .header { padding: 15px 40px; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; }
        .order-title { font-size: 18px; color: #111; font-weight: 500; }
        .delivery-accent { color: #16a34a; font-weight: bold; font-size: 18px; margin-top: 10px; }
        .content { padding: 40px; }
        .order-meta { font-size: 13px; color: #555; margin-bottom: 30px; }
        .product-card { border: 1px solid #eee; border-radius: 4px; padding: 20px; margin-bottom: 15px; display: flex; align-items: flex-start; }
        .product-info { margin-left: 20px; flex: 1; }
        .product-name { font-weight: bold; color: #0066c0; font-size: 15px; margin-bottom: 5px; }
        .track-button { display: inline-block; padding: 10px 20px; background-color: #f0c14b; border: 1px solid #a88734; color: #111 !important; text-decoration: none; border-radius: 3px; font-size: 13px; font-weight: 500; margin-top: 20px; text-align: center; }
        .total-box { border-top: 1px solid #ddd; padding-top: 20px; margin-top: 20px; text-align: right; }
        .total-amount { font-size: 20px; font-weight: bold; color: #B12704; }
        .footer { background-color: #ffffff; padding: 20px 40px; border-top: 1px solid #ddd; text-align: left; font-size: 11px; color: #555; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <div class="order-title">Order Confirmation</div>
                <div style="font-size: 24px; font-weight: 900; color: #f27c06;">Super Knee</div>
            </div>
            <div class="content">
                <div style="font-size: 18px; font-weight: bold;">Hi ${userName},</div>
                <p>Thanks for your order. We’ll send a confirmation when your items ship.</p>
                
                <div class="delivery-accent">Expected by ${dateString}</div>
                
                <div class="order-meta">
                    Order # ${order.razorpayOrderId}<br>
                    Total Order Value: ₹${order.totalAmount}
                </div>

                <a href="https://superkneewebsite.vercel.app/orders" class="track-button">Track your package</a>

                <div style="margin-top: 30px;">
                    <div style="font-weight: bold; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 15px;">Order Summary</div>
                    ${order.items.map(item => `
                        <div class="product-card">
                            <div style="width: 80px; height: 80px; background-color: #f8f8f8; border: 1px solid #eee; border-radius: 4px; display: flex; justify-content: center; align-items: center; overflow: hidden;">
                                <img src="${item.image || 'https://via.placeholder.com/80?text=Knee+Box'}" style="max-width: 100%; height: auto;">
                            </div>
                            <div class="product-info">
                                <div class="product-name">${item.name || item.productName || "Super Knee Product"}</div>
                                <div style="font-size: 13px; color: #555;">Quantity: ${item.quantity}</div>
                                <div style="font-size: 13px; color: #555;">Item Price: ₹${item.price}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="total-box">
                    <span style="font-size: 14px; color: #555;">Order Total: </span>
                    <span class="total-amount">₹${order.totalAmount}</span>
                </div>

                <div style="background: #fdfdfd; padding: 20px; border: 1px solid #eee; border-radius: 4px; margin-top: 30px; font-size: 13px;">
                    <div style="font-weight: bold; color: #555; margin-bottom: 5px; text-transform: uppercase; font-size: 11px;">Shipping to:</div>
                    <strong>${order.shippingAddress.name}</strong><br>
                    ${order.shippingAddress.address}<br>
                    ${order.shippingAddress.city}, ${order.shippingAddress.pincode}<br>
                </div>
            </div>
            <div class="footer">
                <p>This email was sent from an email address that can't receive emails. Please don't reply to this email.</p>
                <p>&copy; 2026 Super Knee Support. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>
`;
};

module.exports = { welcomeTemplate, orderConfirmationTemplate };

