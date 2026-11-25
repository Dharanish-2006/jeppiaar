import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import { About, Details, Domains } from "./components/Sections.jsx";
import RegistrationForm from "./components/RegistrationForm.jsx";
import { Contact, Footer } from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Details />
      <Domains />
      <section className="section registration" id="register">
        <p className="section-tag">SECURE YOUR SPOT</p>
        <h2>Ready to <span>Hack?</span></h2>
        <p className="section-description">
          Register your team and become part of an exciting innovation experience.
        </p>
        <RegistrationForm />
      </section>
      <Contact />
      <Footer />
    </>
  );
}
