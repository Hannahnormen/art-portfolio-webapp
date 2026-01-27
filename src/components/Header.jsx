import { useState } from "react"
import { Link } from "react-router-dom"

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
    <header className="header">
      <div className="header-inner">
          <div className="logo-group">
              <div className="menu-icon"
                onClick={() => setIsOpen(!isOpen)}
              >
                  <span></span>
                  <span></span>
                  <span></span>
              </div>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <h2 className="logo">HANNAH NORMÉN</h2>
            
               </Link>
          </div>
        </div>
    </header>

    <nav className={`side-menu ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/art" onClick={() => setIsOpen(false)}>Art</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
      </nav>
    </>
  )
}

export default Header
