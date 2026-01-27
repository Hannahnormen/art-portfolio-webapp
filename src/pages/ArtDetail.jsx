import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ArtDetail({ artworks }) {
  const { id } = useParams();

  const [selectedSize, setSelectedSize] = useState("30x40");
  const [quantity, setQuantity] = useState(1);

  const prices = {
    "30x40": 499,
    "50x70": 699,
    "70x100": 899
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const art = artworks ? artworks.find(a => a.id === parseInt(id)) : null;

  if (!art) {
    return <div style={{ padding: "200px", textAlign: "center" }}>Motivet hittades inte.</div>;
  }
  
  const totalPrice = prices[selectedSize] * quantity;

  return (
    <div className="art-detail-page">
      <div className="detail-container">
        <div className="detail-image">
          <img src={art.image} alt={art.title} />
        </div>

        <div className="detail-content">
          <Link to="/art" className="back-link">← Tillbaka till galleriet</Link>
          <h1>{art.title}</h1>
          
          <div className="price-tag">
            <span style={{ fontSize: '24px', fontWeight: '600' }}>{totalPrice} SEK</span>
            {quantity > 1 && <span style={{ fontSize: '14px', color: '#888', marginLeft: '10px' }}>({prices[selectedSize]} SEK/st)</span>}
          </div>
          
          <div className="selection-area" style={{ margin: '30px 0', display: 'flex', gap: '20px' }}>

            <div style={{ flex: 2 }}>
              <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.1em' }}>Storlek</label>
              <select 
                value={selectedSize} 
                onChange={(e) => setSelectedSize(e.target.value)}
                style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '0', appearance: 'none', backgroundColor: '#fff', cursor: 'pointer' }}
              >
                <option value="30x40">30x40 cm</option>
                <option value="50x70">50x70 cm</option>
                <option value="70x100">70x100 cm</option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.1em' }}>Antal</label>
              <input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '0', textAlign: 'center' }}
              />
            </div>
          </div>

          <div className="info-block">
            <p><strong>Material:</strong> Tryckt på 220g högkvalitativt premiumpapper med matt finish.</p>
            <p className="description" style={{ marginTop: '15px', fontStyle: 'italic' }}>{art.description}</p>
          </div>
          <a 
            href={`mailto:dinmail@adress.com?subject=Beställningsförfrågan: ${art.title}&body=Hej Hannah!%0D%0A%0D%0AJag skulle vilja göra en beställningsförfrågan på följande:%0D%0A%0D%0AMotiv: ${art.title}%0D%0AStorlek: ${selectedSize} cm%0D%0AAntal: ${quantity} st%0D%0ATotalpris: ${totalPrice} SEK%0D%0A%0D%0AVänliga hälsningar,%0D%0A[Ditt namn]`} 
            className="order-btn"
            style={{ marginTop: '20px' }}
          >
            Skicka beställningsförfrågan
          </a>
          
          <p className="order-note" style={{ marginTop: '20px', fontSize: '11px', color: '#999' }}>
            När du klickar på knappen öppnas ditt e-postprogram med ett färdigt utkast. 
            Jag återkommer med betalningsinstruktioner och leveranstid så snart som möjligt.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ArtDetail;