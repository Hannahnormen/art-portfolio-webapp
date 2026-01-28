const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ======================
   MIDDLEWARE
====================== */

// CORS – tillåt frontend att POST:a
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// JSON body parser
app.use(express.json());

/* ======================
   MAIL SETUP
====================== */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Valfritt men bra: verifiera mail vid start
transporter.verify((error, success) => {
  if (error) {
    console.error("Mail config error:", error);
  } else {
    console.log("Mail server ready");
  }
});

/* ======================
   ROUTES
====================== */

app.post("/api/contact", async (req, res) => {
  console.log("REQ BODY:", req.body);

  const { name, email, phone, message } = req.body;

  // Enkel validering (viktigt!)
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields",
    });
  }

  try {
    await transporter.sendMail({
      from: `"Website contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      replyTo: email,
      subject: "New contact form message",
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "-"}

Message:
${message}
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("FULL MAIL ERROR:", error);
    return res.status(500).json({ success: false });
  }
});

/* ======================
   START SERVER
====================== */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
