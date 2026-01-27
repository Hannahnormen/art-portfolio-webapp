import React from 'react';
import { Link } from 'react-router-dom';

function Art({ artworks }) {
  return (
    <section className="art-page">
      <header className="art-header">
        <h1>Art for sale</h1>
        <p>
          Hand-painted originals and limited edition prints.<br />
          Created to live in your space.
        </p>
      </header>

      <div className="art-grid">
        {artworks && artworks.map((art) => (
          <Link to={`/art/${art.id}`} key={art.id} className="art-card">
            <div className="art-image-frame">
              <img src={art.image} alt={art.title} />
            </div>
          
            <div className="art-info">
              <h3>{art.title}</h3>
              <p>{art.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Art;