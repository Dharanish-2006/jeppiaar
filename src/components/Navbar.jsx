import { useState } from "react";

const LINKS = ["home", "about", "details", "domains", "register"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <nav className="navbar">
        <div className="logo">QUANT<span>IX'26.</span></div>

        <div className={"nav-links" + (open ? " active" : "")}>
          {LINKS.map((id) => (
            <a key={id} href={"#" + id} onClick={() => setOpen(false)}>
              {id[0].toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>

        <a href="#register" className="nav-btn">Join Now</a>

        <button className="menu-btn" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
          ☰
        </button>
      </nav>
    </header>
  );
}
