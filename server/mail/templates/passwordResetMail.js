// In mail/templates/passwordResetMail.js

exports.passwordResetMail = (url) => {
    return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Password Reset Request</title>
      <style>
        body { background-color: #f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 16px; line-height: 1.6; color: #333333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; padding: 20px; background-color: #ffffff; border-radius: 10px; text-align: left; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); }
        .logo { display: block; margin: 0 auto 20px auto; max-width: 150px; }
        h1 { font-size: 24px; color: #FF9800; margin-bottom: 10px; text-align: center; }
        p { font-size: 16px; line-height: 1.6; margin: 10px 0; color: #333333; }
        .cta { display: inline-block; background-color: #FF9800; color: #ffffff; padding: 12px 20px; text-align: center; border-radius: 5px; font-weight: bold; text-decoration: none; margin-top: 20px; display: block; width: fit-content; margin-left: auto; margin-right: auto; }
        .support { text-align: center; font-size: 14px; color: #777777; margin-top: 30px; }
        a { color: #FF9800; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <a href="https://enlighto.vercel.app/">
          <img class="logo" src="https://res.cloudinary.com/dmiex3ja5/image/upload/v1729033933/enlighto_dy76wb.png" alt="Enlighto Logo">
        </a>
        <h1>Password Reset Request</h1>
        <p>Dear User,</p>
        <p>We received a request to reset the password associated with your account.</p>
        <p> This link is valid for <strong> 5 minutes </strong> only. Please click the link below to reset your password:</p>
        <a class="cta" href="${url}">Reset Password</a>
        <p>If you did not request this password reset, please ignore this email, and your password will remain unchanged.</p>
        <div class="support">
          If you need further assistance, feel free to reach out to us at 
          <a href="mailto:vineetvermaa30@gmail.com">vineetvermaa30@gmail.com</a>. We’re here to help!
        </div>
      </div>
    </body>
    </html>`;
  };
  