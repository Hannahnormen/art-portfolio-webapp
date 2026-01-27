import { useState } from "react";

function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleReset = () => {
    setSubmitted(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const trimmedMessage = formData.message.trim();
  
    if (trimmedMessage.length < 5) {
      alert("Meddelandet är för kort.");
      setLoading(false);
      return;
    }
  
    if (trimmedMessage.length > 1000) {
      alert("Meddelandet är för långt (max 1000 tecken).");
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          message: trimmedMessage,
        }),
      });
  
      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        alert("Något gick fel");
      }
    } catch (error) {
      console.error(error);
      alert("Serverfel");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <section className="contact-page">
      <div className="contact-inner">
        <h1>Contact</h1>
        <p>Send me a message and I’ll get back to you.</p>
  
        {!submitted && (
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
  
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
  
            <input
              type="tel"
              name="phone"
              placeholder="Phone (optional)"
              value={formData.phone}
              onChange={handleChange}
            />
  
            <textarea
              name="message"
              placeholder="Message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            />
  
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send message"}
            </button>

          </form>
        )}
      </div>
  
      {submitted && (
        <div className="contact-success-overlay">
          <div className="contact-success-card">
            <h2>Thank you</h2>
            <p>
              Your message has been sent.<br />
              I’ll be in touch shortly.
            </p>
  
            <button onClick={() => setSubmitted(false)}>
              Send another message
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Contact;
