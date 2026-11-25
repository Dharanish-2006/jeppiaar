export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="tag">THINK • SOLVE • INNOVATE</p>
        <h1>
          Think Beyond <br />
          Build <span>Beyond.</span>
        </h1>
        <p className="hero-description">
          Join our college hackathon and collaborate with creative minds to
          build innovative solutions for real-world problems.
        </p>
        <div className="hero-buttons">
          <a href="#register" className="primary-btn">Register Your Team →</a>
          <a href="#about" className="secondary-btn">Explore Event</a>
        </div>
      </div>

      <div className="hero-card">
        <div className="card-icon">⚡</div>
        <h2>6 Hours</h2>
        <p>Of Innovation & Creativity</p>
        <div className="card-line"></div>
        <h3>IDEAS MAKES BRIGHTER TOMORROW.</h3>
      </div>
    </section>
  );
}
