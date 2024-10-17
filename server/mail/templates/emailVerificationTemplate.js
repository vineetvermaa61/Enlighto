const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
	  <html>
	  
	  <head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
		  body {
			background-color: #f5f5f5;
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
			font-size: 16px;
			line-height: 1.6;
			color: #333333;
			margin: 0;
			padding: 0;
		  }
  
		  .container {
			max-width: 600px;
			margin: 40px auto;
			padding: 20px;
			background-color: #ffffff;
			border-radius: 10px;
			text-align: left;
			box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		  }
  
		  .logo {
			display: block;
			margin: 0 auto 20px auto;
			max-width: 150px;
		  }
  
		  h1 {
			font-size: 24px;
			color: #FF9800;
			margin-bottom: 10px;
			text-align: center;
		  }
  
		  p {
			font-size: 16px;
			line-height: 1.6;
			margin: 10px 0;
			color: #333333;
		  }
  
		  .highlight {
			font-weight: bold;
			font-size: 22px;
			color: #FF9800;
			text-align: center;
		  }
  
		  .cta {
			display: inline-block;
			background-color: #FF9800;
			color: #ffffff;
			padding: 12px 20px;
			text-align: center;
			border-radius: 5px;
			font-weight: bold;
			text-decoration: none;
			margin-top: 20px;
			display: block;
			width: fit-content;
			margin-left: auto;
			margin-right: auto;
		  }
  
		  .support {
			text-align: center;
			font-size: 14px;
			color: #777777;
			margin-top: 30px;
		  }
  
		  a {
			color: #FF9800;
			text-decoration: none;
		  }
		</style>
	  </head>
	  
	  <body>
		<div class="container">
		  <a href="https://enlighto.vercel.app/">
			<img class="logo" src="https://res.cloudinary.com/dmiex3ja5/image/upload/v1729033933/enlighto_dy76wb.png" alt="Enlighto Logo">
		  </a>
		  <h1>OTP Verification Email</h1>
		  <p>Dear User,</p>
		  <p>Thank you for registering with <strong>Enlighto</strong>. To complete your registration, please use the following One-Time Password (OTP) to verify your account:</p>
		  <h2 class="highlight">${otp}</h2>
		  <p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.</p>
		  <p>Once your account is verified, you will have full access to our platform and its features.</p>
  
		  <div class="support">
			If you have any questions or need assistance, please feel free to reach out to us at 
			<a href="mailto:vineetvermaa30@gmail.com">vineetvermaa30@gmail.com</a>. We are here to help!
		  </div>
		</div>
	  </body>
	  
	  </html>`;
  };
  
  module.exports = otpTemplate;
  



// const otpTemplate = (otp) => {
// 	return `<!DOCTYPE html>
// 	<html>
	
// 	<head>
// 		<meta charset="UTF-8">
// 		<title>OTP Verification Email</title>
// 		<style>
// 			body {
// 				background-color: #ffffff;
// 				font-family: Arial, sans-serif;
// 				font-size: 16px;
// 				line-height: 1.4;
// 				color: #333333;
// 				margin: 0;
// 				padding: 0;
// 			}
	
// 			.container {
// 				max-width: 600px;
// 				margin: 0 auto;
// 				padding: 20px;
// 				text-align: center;
// 			}
	
// 			.logo {
// 				max-width: 200px;
// 				margin-bottom: 20px;
// 			}
	
// 			.message {
// 				font-size: 18px;
// 				font-weight: bold;
// 				margin-bottom: 20px;
// 			}
	
// 			.body {
// 				font-size: 16px;
// 				margin-bottom: 20px;
// 			}
	
// 			.cta {
// 				display: inline-block;
// 				padding: 10px 20px;
// 				background-color: #FFD60A;
// 				color: #000000;
// 				text-decoration: none;
// 				border-radius: 5px;
// 				font-size: 16px;
// 				font-weight: bold;
// 				margin-top: 20px;
// 			}
	
// 			.support {
// 				font-size: 14px;
// 				color: #999999;
// 				margin-top: 20px;
// 			}
	
// 			.highlight {
// 				font-weight: bold;
// 			}
// 		</style>
	
// 	</head>
	
// 	<body>
// 		<div class="container">
// 			<a href="https://enlighto.vercel.app/"><img class="logo"
// 					src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo"></a>
// 			<div class="message">OTP Verification Email</div>
// 			<div class="body">
// 				<p>Dear User,</p>
// 				<p>Thank you for registering with StudyNotion. To complete your registration, please use the following OTP
// 					(One-Time Password) to verify your account:</p>
// 				<h2 class="highlight">${otp}</h2>
// 				<p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.
// 				Once your account is verified, you will have access to our platform and its features.</p>
// 			</div>
// 			<div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
// 					href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!</div>
// 		</div>
// 	</body>
	
// 	</html>`;
// };
// module.exports = otpTemplate;
