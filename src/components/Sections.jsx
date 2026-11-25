import { DOMAINS } from "../data.js";

export function About() {
  return (
    <section className="section" id="about">
      <p className="section-tag">ABOUT THE EVENT</p>
      <h2>Build Something <span>Meaningful.</span></h2>
      <p className="section-description">
        QuantiX is an open innovation hackathon where students work together to
        identify problems, develop creative solutions and showcase their
        technical skills.
      </p>
      <div className="features">
        <div className="feature">
          <h3>💡 Innovation</h3>
          <p>Transform creative ideas into solutions.</p>
        </div>
        <div className="feature">
          <h3>🤝 Teamwork</h3>
          <p>Collaborate and learn with other students.</p>
        </div>
        <div className="feature">
          <h3>🚀 Experience</h3>
          <p>Build projects and present your ideas.</p>
        </div>
      </div>
    </section>
  );
}

export function Details() {
  return (
    <section className="section details" id="details">
      <p className="section-tag">EVENT INFORMATION</p>
      <h2>Event <span>Details</span></h2>
      <div className="detail-grid">
        <div className="detail-card">
          <h3>📅 Date</h3>
          <p>Update Event Date</p>
        </div>
        <div className="detail-card">
          <h3>⏱ Duration</h3>
          <p>6 Hours</p>
        </div>
        <div className="detail-card">
          <h3>📍 Venue</h3>
          <p>3rd Floor Auditorium, Jeppiaar Institute of Technology.</p>
        </div>
        <div className="detail-card">
          <h3>👥 Team Size</h3>
          <p>2–4 Members</p>
        </div>
      </div>
    </section>
  );
}

export function Domains() {
  return (
    <section className="section" id="domains">
      <p className="section-tag">EXPLORE THE POSSIBILITIES</p>
      <h2>Innovation <span>Domains</span></h2>
      <div className="domain-grid">
        {DOMAINS.map((d) => (
          <div className="domain-card" key={d.name}>{d.icon} {d.name}</div>
        ))}
      </div>
    </section>
  );
}
