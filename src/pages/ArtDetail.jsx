import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ArtDetail({ artworks }) {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("30x40");
  const [quantity, setQuantity] = useState(1);
  
  // States för Modal och formulär
  const [showModal, setShowModal] = useState(false);
  const [customerData, setCustomerData] = useState({ name: '', email: '', address: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const prices = { "30x40": 499, "50x70": 699, "70x100": 899 };
  const art = artworks?.find(a => a.id === parseInt(id));
  const totalPrice = prices[selectedSize] * quantity;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!art) return <div style={{ padding: "200px", textAlign: "center" }}>Motiv hittades inte.</div>;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsSending(true);

    // VIKTIGT: Ändra denna URL till din Render-adress sen, 
    // t.ex. "https://din-backend.onrender.com/api/order"
    const backendUrl = process.env.NODE_ENV === 'production' 
      ? "https://din-backend-url.onrender.com/api/order" 
      : "http://localhost:5000/api/order";

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artTitle: art.title,
          size: selectedSize,
          quantity,
          totalPrice,
          ...customerData
        }),
      });

      if (response.ok) {
        setIsSent(true);
        setTimeout(() => { 
          setShowModal(false); 
          setIsSent(false); 
        }, 3000);
      } else {
        throw new Error("Failed to send");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="art-detail-page">
      <div className="detail-container">
        <div className="detail-image">
          <img src={art.image} alt={art.title} onContextMenu={e => e.preventDefault()} />
        </div>

        <div className="detail-content">
          <Link to="/art" className="back-link">← Back to Gallery</Link>
          <h1>{art.title}</h1>
          <p className="price">{totalPrice} SEK</p>
          
          <div className="selection-area" style={{ display: 'flex', gap: '20px', margin: '30px 0' }}>
            <div style={{ flex: 2 }}>
              <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', marginBottom: '8px' }}>Size</label>
              <select value={selectedSize} onChange={e => setSelectedSize(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #eee' }}>
                <option value="30x40">30x40 cm</option>
                <option value="50x70">50x70 cm</option>
                <option value="70x100">70x100 cm</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', marginBottom: '8px' }}>Qty</label>
              <input type="number" min="1" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} style={{ width: '100%', padding: '12px', border: '1px solid #eee', textAlign: 'center' }} />
            </div>
          </div>

          <button onClick={() => setShowModal(true)} className="order-btn">Request Order</button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-content" style={{ background: '#fff', padding: '40px', maxWidth: '500px', width: '90%', position: 'relative' }}>
            {!isSent ? (
              <>
                <button onClick={() => setShowModal(false)} style={{ position: 'absolute', right: '20px', top: '20px', border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}>×</button>
                <h2 style={{ marginBottom: '20px', fontSize: '18px', letterSpacing: '0.1em' }}>SHIPPING DETAILS</h2>
                <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <input required placeholder="Full Name" onChange={e => setCustomerData({...customerData, name: e.target.value})} style={{ padding: '12px', border: '1px solid #eee' }} />
                  <input required type="email" placeholder="Email" onChange={e => setCustomerData({...customerData, email: e.target.value})} style={{ padding: '12px', border: '1px solid #eee' }} />
                  <textarea required placeholder="Address, Zip, City, Country" onChange={e => setCustomerData({...customerData, address: e.target.value})} style={{ padding: '12px', border: '1px solid #eee', height: '100px', fontFamily: 'inherit' }} />
                  <button disabled={isSending} type="submit" className="order-btn" style={{ border: 'none', cursor: 'pointer' }}>
                    {isSending ? "Sending..." : "Confirm & Send Request"}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <h2 style={{ marginBottom: '10px' }}>Thank you!</h2>
                <p>Your request for {art.title} has been sent.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtDetail;