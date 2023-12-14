import nodemailer from "nodemailer";
export async function sendEmail (to, subject, html){
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: `"R-Clinics 👻" <${process.env.USER_EMAIL}>`, 
    to, 
    subject, 
    html, 
  });
  return info;
}