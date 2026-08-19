const nodemailer = require("nodemailer");
require("dotenv").config();

const createTransporter = () => {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = process.env.SMTP_PORT || 465;
  const user = process.env.SMTP_MAIL || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASSWORD || process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn("SMTP credentials missing! SMTP_MAIL:", user);
    return null;
  }

  if (host.includes("gmail")) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user.trim(),
        pass: pass.trim(),
      },
    });
  }

  return nodemailer.createTransport({
    host: host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: {
      user: user.trim(),
      pass: pass.trim(),
    },
  });
};

const getAdminEmailTemplate = ({ name, email, message, dateStr }) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Contact Message</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f6f9; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08);">
          
          <!-- HEADER -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px 25px; text-align: center;">
              <div style="display: inline-block; background-color: rgba(255, 180, 0, 0.15); border: 1px solid #ffb400; padding: 6px 14px; border-radius: 20px; color: #ffb400; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">
                NEW INQUIRY
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">
                📩 New Contact Message
              </h1>
              <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px;">
                Arbaz Murme Portfolio Website
              </p>
            </td>
          </tr>

          <!-- BODY CONTENT -->
          <tr>
            <td style="padding: 30px 25px;">
              <!-- SENDER DETAILS CARD -->
              <table role="presentation" width="100%" style="background-color: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0; padding: 18px; margin-bottom: 25px;">
                <tr>
                  <td style="padding-bottom: 10px; color: #64748b; font-size: 13px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">
                    Sender Details
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #1e293b; font-size: 15px;">
                    <strong style="color: #475569;">Name:</strong> <span style="font-weight: 600; color: #0f172a;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #1e293b; font-size: 15px;">
                    <strong style="color: #475569;">Email:</strong> 
                    <a href="mailto:${email}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #1e293b; font-size: 13px;">
                    <strong style="color: #475569;">Time:</strong> <span style="color: #64748b;">${dateStr}</span>
                  </td>
                </tr>
              </table>

              <!-- MESSAGE CARD -->
              <div style="margin-bottom: 25px;">
                <div style="color: #475569; font-size: 13px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 8px;">
                  Message Content
                </div>
                <div style="background-color: #0f172a; color: #f8fafc; padding: 20px; border-radius: 10px; border-left: 5px solid #ffb400; font-size: 15px; line-height: 1.6;">
                  ${message.replace(/\n/g, "<br>")}
                </div>
              </div>

              <!-- REPLY BUTTON -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${email}?subject=Re:%20Portfolio%20Inquiry" style="display: inline-block; background-color: #ffb400; color: #000000; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 15px; box-shadow: 0 4px 12px rgba(255, 180, 0, 0.3);">
                  ✉️ Reply to ${name}
                </a>
              </div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 25px; text-align: center; color: #94a3b8; font-size: 12px;">
              <p style="margin: 0;">Automated notification from <strong>Arbaz Murme Portfolio System</strong></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

const getUserEmailTemplate = ({ name, message }) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Reaching Out</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f6f9; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08);">
          
          <!-- HEADER -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 35px 25px; text-align: center;">
              <div style="width: 50px; height: 50px; background-color: #ffb400; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: #000000; font-size: 24px; font-weight: bold; margin: 0 auto 12px auto; box-shadow: 0 4px 12px rgba(255, 180, 0, 0.4);">
                ✓
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">
                Message Received!
              </h1>
              <p style="color: #ffb400; margin: 8px 0 0 0; font-size: 14px; font-weight: 600;">
                Arbaz Murme | Full Stack Web Developer
              </p>
            </td>
          </tr>

          <!-- BODY CONTENT -->
          <tr>
            <td style="padding: 30px 25px;">
              <p style="color: #1e293b; font-size: 16px; margin-top: 0;">
                Hi <strong style="color: #0f172a;">${name}</strong>,
              </p>
              
              <p style="color: #475569; font-size: 15px; line-height: 1.6;">
                Thank you for reaching out through my portfolio website! I have received your message and will review it as soon as possible.
              </p>

              <div style="background-color: #f8fafc; border-left: 4px solid #ffb400; border-radius: 6px; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                  ⚡ Quick Note:
                </p>
                <p style="margin: 6px 0 0 0; color: #334155; font-size: 14px;">
                  I usually respond within <strong>24-48 hours</strong>. If your request is urgent, feel free to connect directly via email or mobile.
                </p>
              </div>

              <!-- MESSAGE COPY -->
              <div style="margin-top: 25px;">
                <div style="color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                  Copy of Your Message:
                </div>
                <div style="background-color: #f1f5f9; color: #334155; padding: 18px; border-radius: 10px; font-size: 14px; line-height: 1.6; font-style: italic; border: 1px solid #e2e8f0;">
                  "${message.replace(/\n/g, "<br>")}"
                </div>
              </div>

              <!-- PORTFOLIO LINK & CONTACT INFO -->
              <table role="presentation" width="100%" style="margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 6px 0; color: #0f172a; font-weight: 700; font-size: 15px;">
                      Arbaz Murme
                    </p>
                    <p style="margin: 0; color: #64748b; font-size: 13px; line-height: 1.4;">
                      Full Stack Web Developer<br>
                      Solapur, Maharashtra, India<br>
                      Email: <a href="mailto:arbazmurme@gmail.com" style="color: #0284c7; text-decoration: none;">arbazmurme@gmail.com</a> | Phone: +91 9028121976
                    </p>
                  </td>
                </tr>
              </table>

              <!-- VISIT WEBSITE BUTTON -->
              <div style="text-align: center; margin-top: 25px;">
                <a href="https://arbazmurme.vercel.app" target="_blank" style="display: inline-block; background-color: #0f172a; color: #ffb400; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; border: 1px solid #ffb400;">
                  🌐 Visit Portfolio Website
                </a>
              </div>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 25px; text-align: center; color: #94a3b8; font-size: 12px;">
              <p style="margin: 0;">© ${new Date().getFullYear()} Arbaz Murme. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

const sendContactEmails = async ({ name, email, message }) => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.warn("SMTP credentials (SMTP_MAIL / SMTP_PASSWORD) are not set in .env. Emails skipping.");
      return { success: false, reason: "SMTP credentials not configured" };
    }

    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_MAIL || "arbazmurme@gmail.com";
    const dateStr = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // 1. Mail to Admin
    const adminMailOptions = {
      from: `"Portfolio Inquiry" <${process.env.SMTP_MAIL}>`,
      to: adminEmail,
      subject: `🚀 New Contact Inquiry from ${name}`,
      html: getAdminEmailTemplate({ name, email, message, dateStr }),
    };

    // 2. Mail to User (Confirmation)
    const userMailOptions = {
      from: `"Arbaz Murme" <${process.env.SMTP_MAIL}>`,
      to: email,
      subject: `Thank you for reaching out, ${name}!`,
      html: getUserEmailTemplate({ name, message }),
    };

    const results = await Promise.allSettled([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    results.forEach((res, idx) => {
      const target = idx === 0 ? "Admin" : "User";
      if (res.status === "fulfilled") {
        console.log(`Email sent successfully to ${target}`);
      } else {
        console.error(`Failed to send email to ${target}:`, res.reason);
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Error in sendContactEmails:", error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendContactEmails };
