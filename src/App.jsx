import { Routes, Route, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Contact from "./pages/Contact";
import Art from "./pages/Art";
import ArtDetail from "./pages/ArtDetail"; 
import { artworks } from "./data/artworks";


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="container">
      <ScrollToTop /> 
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <section className="hero">
                <div className="hero-content">
                  <h1>EXPLORE THE PRINT COLLECTION</h1>
                  <p>Hand-painted, contemporary originals. Reimagined as fine art prints.</p>
                </div>
              </section>

              <section className="about-section">
                <div className="about-text">
                  <h2>ABOUT ME</h2>
                  <p> I'm Hannah, based in Sweden. Alongside my studies in ICT, I paint mainly ina acrylic and oil. I sell a selection of my original works as art prints.</p>
                </div>
                <div className="about-image">
                  <img src="/images/IMG_1860.jpg" alt="About Hannah Johnson" />
                </div>

              </section>

              <section className="portfolio">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <h2>PORTFOLIO</h2>
                  <p>A curated selection of original works</p>
                </div>
                <div className="portfolio-grid">
                  {artworks.map((project) => (
                    <div
                      key={project.id}
                      className="portfolio-item"
                      style={{
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                  ))}
                </div>
              </section>

              
              <section className="contact-wrapper">
                <div className="contact-box contact-bg">
                  <h2>Get in touch</h2>
                  <p>For questions, custom commissions or creative collaborations. Please get in touch below.</p>
                  <Link to="/contact" className="contact-btn">
                    Contact
                  </Link>

                </div>
              </section>
            </>
          }
        />

        <Route path="/contact" element={<Contact />} />
        
        <Route path="/art" element={<Art artworks={artworks} />} />
        
        <Route path="/art/:id" element={<ArtDetail artworks={artworks} />} />
      </Routes>

      <footer className="footer">
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/art">Art</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-bottom">
          <p>© 2026 All rights reserved</p>
        </div>
      </footer>

    </div>
  );
}

export default App;