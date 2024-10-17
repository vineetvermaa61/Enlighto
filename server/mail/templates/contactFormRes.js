


exports.contactUsEmail = (
  email,
  firstname,
  lastname,
  message,
  phoneNo,
  countrycode
) => {
  // Ensure country code is only displayed if provided
  const formattedPhoneNo = countrycode ? `+${countrycode} ${phoneNo}` : phoneNo;

  return `<!DOCTYPE html>
  <html>

  <head>
    <meta charset="UTF-8">
    <title>Contact Form Confirmation</title>
    <style>
      body {
        background-color: #f5f5f5;
        color: #333333;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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

      .details {
        background-color: #f9f9f9;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 1px solid #e0e0e0;
      }

      .details p {
        margin: 5px 0;
        color: #555555;
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
      <h1>Thank You for Reaching Out, ${firstname}!</h1>
      <p>We sincerely appreciate you getting in touch with us. Your message has been received, and a member of our team will review it shortly. We will respond to your inquiry at the earliest opportunity.</p>
      <p>Below are the details we have received from you:</p>

      <div class="details">
        <p><strong>Name:</strong> ${firstname} ${lastname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${formattedPhoneNo}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>

      <a href="mailto:vineetvermaa30@gmail.com" class="cta">Need Immediate Assistance?</a>

      <div class="support">
        If you have any further questions or concerns, feel free to reach out to us directly at 
        <a href="mailto:vineetvermaa30@gmail.com">vineetvermaa30@gmail.com</a>. We're here to assist you.
      </div>
    </div>
  </body>

  </html>`;
};



// exports.contactUsEmail = (
//   email,
//   firstname,
//   lastname,
//   message,
//   phoneNo,
//   countrycode
// ) => {
//   return `<!DOCTYPE html>
//   <html>
  
//   <head>
//       <meta charset="UTF-8">
//       <title>Contact Form Confirmation</title>
//       <style>
//           body {
//               background-color: #ffffff;
//               font-family: Arial, sans-serif;
//               font-size: 16px;
//               line-height: 1.4;
//               color: #333333;
//               margin: 0;
//               padding: 0;
//           }
  
  
//           .container {
//               max-width: 600px;
//               margin: 0 auto;
//               padding: 20px;
//               text-align: center;
//           }
  
//           .logo {
//               max-width: 200px;
//               margin-bottom: 20px;
//           }
  
//           .message {
//               font-size: 18px;
//               font-weight: bold;
//               margin-bottom: 20px;
//           }
  
//           .body {
//               font-size: 16px;
//               margin-bottom: 20px;
//           }
  
//           .cta {
//               display: inline-block;
//               padding: 10px 20px;
//               background-color: #FFD60A;
//               color: #000000;
//               text-decoration: none;
//               border-radius: 5px;
//               font-size: 16px;
//               font-weight: bold;
//               margin-top: 20px;
//           }
  
//           .support {
//               font-size: 14px;
//               color: #999999;
//               margin-top: 20px;
//           }
  
//           .highlight {
//               font-weight: bold;
//           }
//       </style>
  
//   </head>
  
//   <body>
//       <div class="container">
//           <a href="https://enlighto.vercel.app/"><img class="logo"
//                   src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo"></a>
//           <div class="message">Contact Form Confirmation</div>
//           <div class="body">
//               <p>Dear ${firstname} ${lastname},</p>
//               <p>Thank you for contacting us. We have received your message and will respond to you as soon as possible.
//               </p>
//               <p>Here are the details you provided:</p>
//               <p>Name: ${firstname} ${lastname}</p>
//               <p>Email: ${email}</p>
//               <p>Phone Number: ${phoneNo}</p>
//               <p>Message: ${message}</p>
//               <p>We appreciate your interest and will get back to you shortly. </p>
//           </div>
//           <div class="support">If you have any further questions or need immediate assistance, please feel free to reach
//               out to us at <a href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!</div>
//       </div>
//   </body>
  
//   </html>`
// }




// exports.contactUsEmail = (
//     email,
//     firstname,
//     lastname,
//     message,
//     phoneNo,
//     countrycode
//   ) => {
//     return `<!DOCTYPE html>
//     <html>
  
//     <head>
//       <meta charset="UTF-8">
//       <title>Contact Form Confirmation</title>
//       <style>
//         body {
//           background-color: #121212;
//           color: #ffffff;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           margin: 0;
//           padding: 0;
//         }
  
//         .container {
//           max-width: 600px;
//           margin: 40px auto;
//           padding: 20px;
//           background-color: #1f1f1f;
//           border-radius: 10px;
//           text-align: left;
//           box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
//         }
  
//         .logo {
//           display: block;
//           margin: 0 auto 20px auto;
//           max-width: 150px;
//         }
  
//         h1 {
//           font-size: 24px;
//           color: #FF9800;
//           margin-bottom: 10px;
//           text-align: center;
//         }
  
//         p {
//           font-size: 16px;
//           line-height: 1.6;
//           margin: 10px 0;
//         }
  
//         .details {
//           background-color: #2c2c2c;
//           padding: 15px;
//           border-radius: 8px;
//           margin-bottom: 20px;
//         }
  
//         .details p {
//           margin: 5px 0;
//           color: #dddddd;
//         }
  
//         .cta {
//           display: inline-block;
//           background-color: #FF9800;
//           color: #121212;
//           padding: 12px 20px;
//           text-align: center;
//           border-radius: 5px;
//           font-weight: bold;
//           text-decoration: none;
//           margin-top: 20px;
//           display: block;
//           width: fit-content;
//           margin-left: auto;
//           margin-right: auto;
//         }
  
//         .support {
//           text-align: center;
//           font-size: 14px;
//           color: #bbbbbb;
//           margin-top: 30px;
//         }
  
//         a {
//           color: #FF9800;
//           text-decoration: none;
//         }
//       </style>
//     </head>
  
//     <body>
//       <div class="container">
//         <a href="https://enlighto.vercel.app/">
//           <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo">
//         </a>
//         <h1>Thank You for Contacting Us, ${firstname}!</h1>
//         <p>We have received your message and will get back to you shortly. Here’s a summary of your request:</p>
  
//         <div class="details">
//           <p><strong>Name:</strong> ${firstname} ${lastname}</p>
//           <p><strong>Email:</strong> ${email}</p>
//           <p><strong>Phone Number:</strong> ${countrycode} ${phoneNo}</p>
//           <p><strong>Message:</strong> ${message}</p>
//         </div>
  
//         <a href="mailto:info@studynotion.com" class="cta">Need Immediate Help?</a>
  
//         <div class="support">
//           If you have any other questions, feel free to email us at 
//           <a href="mailto:info@studynotion.com">info@studynotion.com</a>.
//         </div>
//       </div>
//     </body>
  
//     </html>`;
//   };
  




// exports.contactUsEmail = (
//     email,
//     firstname,
//     lastname,
//     message,
//     phoneNo,
//     countrycode
//   ) => {
//     return `<!DOCTYPE html>
//     <html>
  
//     <head>
//       <meta charset="UTF-8">
//       <title>Contact Form Confirmation</title>
//       <style>
//         body {
//           background-color: #f5f5f5;
//           color: #333333;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           margin: 0;
//           padding: 0;
//         }
  
//         .container {
//           max-width: 600px;
//           margin: 40px auto;
//           padding: 20px;
//           background-color: #ffffff;
//           border-radius: 10px;
//           text-align: left;
//           box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//         }
  
//         .logo {
//           display: block;
//           margin: 0 auto 20px auto;
//           max-width: 150px;
//         }
  
//         h1 {
//           font-size: 24px;
//           color: #FF9800;
//           margin-bottom: 10px;
//           text-align: center;
//         }
  
//         p {
//           font-size: 16px;
//           line-height: 1.6;
//           margin: 10px 0;
//           color: #333333;
//         }
  
//         .details {
//           background-color: #f9f9f9;
//           padding: 15px;
//           border-radius: 8px;
//           margin-bottom: 20px;
//           border: 1px solid #e0e0e0;
//         }
  
//         .details p {
//           margin: 5px 0;
//           color: #555555;
//         }
  
//         .cta {
//           display: inline-block;
//           background-color: #FF9800;
//           color: #ffffff;
//           padding: 12px 20px;
//           text-align: center;
//           border-radius: 5px;
//           font-weight: bold;
//           text-decoration: none;
//           margin-top: 20px;
//           display: block;
//           width: fit-content;
//           margin-left: auto;
//           margin-right: auto;
//         }
  
//         .support {
//           text-align: center;
//           font-size: 14px;
//           color: #777777;
//           margin-top: 30px;
//         }
  
//         a {
//           color: #FF9800;
//           text-decoration: none;
//         }
//       </style>
//     </head>
  
//     <body>
//       <div class="container">
//         <a href="https://enlighto.vercel.app/">
//           <img class="logo" src="https://res.cloudinary.com/dmiex3ja5/image/upload/v1729033933/enlighto_dy76wb.png" alt="StudyNotion Logo">
//         </a>
//         <h1>Thank You for Contacting Us, ${firstname}!</h1>
//         <p>We have received your message and will get back to you shortly. Here’s a summary of your request:</p>
  
//         <div class="details">
//           <p><strong>Name:</strong> ${firstname} ${lastname}</p>
//           <p><strong>Email:</strong> ${email}</p>
//           <p><strong>Phone Number:</strong> ${countrycode} ${phoneNo}</p>
//           <p><strong>Message:</strong> ${message}</p>
//         </div>
  
//         <a href="mailto:info@studynotion.com" class="cta">Need Immediate Help?</a>
  
//         <div class="support">
//           If you have any other questions, feel free to email us at 
//           <a href="mailto:info@studynotion.com">info@studynotion.com</a>.
//         </div>
//       </div>
//     </body>
  
//     </html>`;
//   };
  