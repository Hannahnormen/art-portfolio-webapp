app.post("/api/order", async (req, res) => {
  const { artTitle, size, quantity, totalPrice, name, email, address } = req.body;

  try {
    await transporter.sendMail({
      from: `"Order Request" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER, // Mailet skickas till dig
      replyTo: email,
      subject: `NEW ORDER: ${artTitle}`,
      text: `
        New order request from website:
        
        Product: ${artTitle}
        Size: ${size}
        Quantity: ${quantity}
        Total Price: ${totalPrice} SEK
        
        --- Customer Details ---
        Name: ${name}
        Email: ${email}
        Address: ${address}
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Order Mail Error:", error);
    return res.status(500).json({ success: false });
  }
});