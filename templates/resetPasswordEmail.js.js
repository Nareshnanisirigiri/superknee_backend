const resetPasswordEmail = (name, link) => {

return `

<h2>Reset Your Password</h2>

<p>Hello ${name},</p>

<p>You requested to reset your password.</p>

<a href="${link}"
style="background:#2563eb;color:white;padding:10px 20px;text-decoration:none;border-radius:5px">
Reset Password
</a>

<p>This link will expire in 1 hour.</p>

`;

};

export default resetPasswordEmail;