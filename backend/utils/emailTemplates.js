export const generatePasswordResetEmail = (link) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.5;">
    <h2>Password Reset Request</h2>
    <p>We received a request to reset your password. Click the button below to reset it:</p>
    <a href="${link}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px; font-size: 16px;">Reset Password</a>
    <p>If you didn't request this, you can ignore this email. Your password will not change.</p>
    <p>Thank you,</p>
    <p>Threads</p>
  </div>
`
