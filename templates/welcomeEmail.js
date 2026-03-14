const welcomeEmail = (name) => {

return `

<div style="font-family:Arial;padding:20px;background:#0f172a;color:white">

<h1 style="color:#22c55e">WELCOME TO SUPER KNEE</h1>

<p>Hi ${name},</p>

<p>Your account has been successfully created.</p>

<p>We are excited to have you in the Super Knee family.</p>

<a href="https://superkneewebsite.vercel.app"
style="background:#22c55e;color:white;padding:12px 25px;text-decoration:none;border-radius:5px">
Visit Our Shop
</a>

<p style="margin-top:20px">
Thank you for choosing Super Knee.
</p>

</div>

`;

};

export default welcomeEmail;