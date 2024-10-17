exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
    return `<!DOCTYPE html>
      <html>
      
      <head>
        <meta charset="UTF-8">
        <title>Payment Confirmation</title>
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
            font-size: 18px;
            color: #FF9800;
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
          <h1>Payment Confirmation</h1>
          <p>Dear ${name},</p>
          <p>We are pleased to confirm that we have received your payment of <span class='highlight'>₹${amount}</span>.</p>
          <p>Your Payment ID is: <b>${paymentId}</b></p>
          <p>Your Order ID is: <b>${orderId}</b></p>
  
          <div class="support">
            If you have any questions or need assistance, please don't hesitate to contact us at 
            <a href="mailto:vineetvermaa30@gmail.com">vineetvermaa30@gmail.com</a>. We are here to help!
          </div>
        </div>
      </body>
      
      </html>`;
  };
  



// exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
//   return `<!DOCTYPE html>
//     <html>
    
//     <head>
//         <meta charset="UTF-8">
//         <title>Payment Confirmation</title>
//         <style>
//             body {
//                 background-color: #ffffff;
//                 font-family: Arial, sans-serif;
//                 font-size: 16px;
//                 line-height: 1.4;
//                 color: #333333;
//                 margin: 0;
//                 padding: 0;
//             }
    
    
//             .container {
//                 max-width: 600px;
//                 margin: 0 auto;
//                 padding: 20px;
//                 text-align: center;
//             }
    
//             .logo {
//                 max-width: 200px;
//                 margin-bottom: 20px;
//             }
    
//             .message {
//                 font-size: 18px;
//                 font-weight: bold;
//                 margin-bottom: 20px;
//             }
    
//             .body {
//                 font-size: 16px;
//                 margin-bottom: 20px;
//             }
    
//             .cta {
//                 display: inline-block;
//                 padding: 10px 20px;
//                 background-color: #FFD60A;
//                 color: #000000;
//                 text-decoration: none;
//                 border-radius: 5px;
//                 font-size: 16px;
//                 font-weight: bold;
//                 margin-top: 20px;
//             }
    
//             .support {
//                 font-size: 14px;
//                 color: #999999;
//                 margin-top: 20px;
//             }
    
//             .highlight {
//                 font-weight: bold;
//             }
//         </style>
    
//     </head>
    
//     <body>
//         <div class="container">
//             <a href="https://enlighto.vercel.app/"><img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png"
//                     alt="StudyNotion Logo"></a>
//             <div class="message">Course Payment Confirmation</div>
//             <div class="body">
//                 <p>Dear ${name},</p>
//                 <p>We have received a payment of <span class='highlight'>₹${amount}</span></p>.
//                 <p>Your Payment ID is <b>${paymentId}</b></p>
//                 <p>Your Order ID is <b>${orderId}</b></p>
//             </div>
//             <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
//                     href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!</div>
//         </div>
//     </body>
    
//     </html>`
// }
