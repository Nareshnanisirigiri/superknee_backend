/**
 * HTML Templates for Emails (Invoice Style)
 * Inspired by Doorstep Hub design
 */

const welcomeTemplate = (userName) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f7f6; }
        .wrapper { width: 100%; padding: 40px 0; }
        .container { width: 100%; max-width: 700px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .header { padding: 40px; display: flex; justify-content: space-between; align-items: flex-start; border-top: 8px solid #005f5f; }
        .title-section h1 { margin: 0; color: #005f5f; font-size: 28px; letter-spacing: 1px; }
        .title-section p { margin: 5px 0 0; color: #777; font-size: 14px; }
        .logo-section { text-align: right; }
        .logo-text { font-size: 32px; font-weight: 900; color: #005f5f; display: block; }
        .content { padding: 0 40px 40px; }
        .intro { margin-bottom: 30px; font-size: 18px; color: #111; }
        .cta-box { background-color: #f8fbfa; border: 1px dashed #005f5f; padding: 30px; border-radius: 6px; text-align: center; }
        .button { display: inline-block; padding: 15px 40px; background-color: #005f5f; color: #ffffff !important; text-decoration: none; border-radius: 4px; font-weight: bold; text-transform: uppercase; font-size: 14px; margin-top: 15px; transition: background 0.3s; }
        .footer { background-color: #005f5f; color: #ffffff; padding: 30px 40px; font-size: 13px; }
        .footer a { color: #ffffff; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.3); }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <div class="title-section">
                    <h1>WELCOME</h1>
                    <p>Date: ${new Date().toLocaleDateString('en-GB')}</p>
                </div>
                <div class="logo-section">
                    <span class="logo-text">Super Knee</span>
                </div>
            </div>
            <div class="content">
                <div class="intro"><strong>Hi ${userName},</strong></div>
                <p>We are delighted to welcome you to the Super Knee family! Your account has been successfully created and you are now part of a community dedicated to better movement and recovery.</p>
                
                <div class="cta-box">
                    <p style="margin: 0; color: #005f5f; font-weight: bold;">Unlock your potential today.</p>
                    <a href="https://superkneewebsite.vercel.app/shop" class="button">Visit Our Shop</a>
                </div>

                <p style="margin-top: 30px; font-size: 14px; color: #666;">If you have any questions or need assistance, please don't hesitate to reach out to our support team.</p>
            </div>
            <div class="footer">
                <div style="display: flex; justify-content: space-between;">
                    <span>www.superknee.com</span>
                    <span>support@superknee.com</span>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;

const orderConfirmationTemplate = (userName, order) => {
    const date = new Date().toLocaleDateString('en-GB');
    
    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f7f6; }
        .wrapper { width: 100%; padding: 40px 0; }
        .container { width: 100%; max-width: 800px; margin: 0 auto; background-color: #ffffff; border-radius: 4px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
        .header { padding: 40px; display: flex; justify-content: space-between; align-items: flex-start; }
        .invoice-title { font-size: 32px; font-weight: bold; color: #005f5f; margin: 0; }
        .invoice-id { font-size: 20px; font-weight: bold; color: #005f5f; margin: 5px 0 0; }
        .invoice-date { font-size: 14px; color: #777; margin: 10px 0 10px; }
        
        .info-grid { display: flex; gap: 40px; padding: 0 40px 30px; }
        .info-box { flex: 1; }
        .info-label { color: #005f5f; font-weight: 800; font-size: 12px; text-transform: uppercase; margin-bottom: 8px; display: block; }
        .info-content { font-size: 13px; line-height: 1.4; color: #444; }

        .items-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        .items-table th { background-color: #005f5f; color: white; text-align: left; padding: 12px 20px; font-size: 11px; text-transform: uppercase; font-weight: bold; }
        .items-table td { padding: 10px 20px; border-bottom: 1px solid #eeeeee; font-size: 13px; vertical-align: middle; }
        .col-no { width: 30px; text-align: center; }
        .col-img { width: 60px; text-align: center; }
        .product-thumb { width: 50px; height: 50px; object-fit: cover; border-radius: 4px; border: 1px solid #eee; display: block; margin: 0 auto; }
        .col-qty { text-align: center; width: 60px; }
        .col-price { text-align: right; width: 90px; }
        .col-total { text-align: right; width: 90px; font-weight: bold; }

        .summary-section { display: flex; justify-content: flex-end; padding: 30px 40px 40px; }
        .summary-table { width: 250px; border-collapse: collapse; }
        .summary-table td { padding: 8px 0; font-size: 14px; }
        .summary-label { color: #555; text-align: left; }
        .summary-value { text-align: right; font-weight: 600; }
        .grand-total { border-top: 2px solid #005f5f; padding-top: 15px !important; color: #005f5f; font-size: 20px !important; font-weight: 900 !important; }

        .notes { padding: 0 40px 30px; font-size: 12px; color: #666; }
        .notes-title { font-weight: 800; color: #005f5f; text-transform: uppercase; font-size: 11px; margin-bottom: 5px; }

        .footer { background-color: #005f5f; color: #ffffff; padding: 20px 40px; font-size: 13px; display: flex; justify-content: space-between; }
        .footer a { color: #ffffff; text-decoration: none; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                <div>
                    <div class="invoice-title">INVOICE:</div>
                    <div class="invoice-id">${order.razorpayOrderId}</div>
                    <div class="invoice-date">Date: ${date}</div>
                </div>
                <div style="text-align: right;">
                    <span style="font-size: 28px; font-weight: 900; color: #005f5f;">Super Knee</span>
                </div>
            </div>

            <div class="info-grid">
                <div class="info-box">
                    <span class="info-label">VENDOR INFO</span>
                    <div class="info-content">
                        <strong>Super Knee Support</strong><br>
                        6-3-712/86, Panjagutta Colony,<br>
                        Hyderabad, Telangana 500082
                    </div>
                </div>
                <div class="info-box">
                    <span class="info-label">CUSTOMER INFO:</span>
                    <div class="info-content">
                        <strong>${order.shippingAddress.name}</strong><br>
                        ${order.shippingAddress.address},<br>
                        ${order.shippingAddress.city}, ${order.shippingAddress.pincode}<br>
                        Phone: ${order.shippingAddress.phone}
                    </div>
                </div>
            </div>

            <table class="items-table">
                <thead>
                    <tr>
                        <th class="col-no">NO.</th>
                        <th class="col-img">IMAGE</th>
                        <th>ITEM NAME</th>
                        <th class="col-qty">UNIT</th>
                        <th class="col-price">PRICE</th>
                        <th class="col-total">TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.items.map((item, index) => {
                        // Fallback image if product image is missing
                        const imageUrl = item.image || item.imageUrl || "https://superkneewebsite.vercel.app/static/media/product-box.jpeg";
                        return `
                        <tr>
                            <td class="col-no">${index + 1}</td>
                            <td class="col-img">
                                <img src="${imageUrl}" alt="Product" class="product-thumb">
                            </td>
                            <td>
                                <strong>${item.name || "Super Knee Product"}</strong>
                            </td>
                            <td class="col-qty">${item.quantity}</td>
                            <td class="col-price">₹${item.price.toFixed(2)}</td>
                            <td class="col-total">₹${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>

            <div class="summary-section">
                <table class="summary-table">
                    <tr>
                        <td class="summary-label">SUB TOTAL</td>
                        <td class="summary-value">₹${order.totalAmount.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td class="summary-label">DISCOUNT</td>
                        <td class="summary-value">₹0.00</td>
                    </tr>
                    <tr>
                        <td class="summary-label">TAX</td>
                        <td class="summary-value">₹0.00</td>
                    </tr>
                    <tr class="grand-total">
                        <td class="summary-label" style="font-weight: 900;">GRAND TOTAL</td>
                        <td class="summary-value">₹${order.totalAmount.toFixed(2)}</td>
                    </tr>
                </table>
            </div>

            <div class="notes">
                <div class="notes-title">NOTES & WARRANTY INFO</div>
                <p style="margin: 0;">We prioritize customer satisfaction. Our team of passionate professionals is dedicated to delivering exceptional service and ensuring your safety and enjoyment.</p>
            </div>

            <div class="footer">
                <span>www.superknee.com</span>
                <span>help@superknee.com</span>
            </div>
        </div>
    </div>
</body>
</html>
`;
};

module.exports = { welcomeTemplate, orderConfirmationTemplate };
