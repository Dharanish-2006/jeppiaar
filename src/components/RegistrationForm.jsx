import { useState } from "react";
import { DOMAINS } from "../data.js";

const emailRe = /^\S+@\S+\.\S+$/;
const phoneRe = /^[0-9+\-\s]{10,15}$/;

const initialForm = {
  teamName: "",
  teamSize: 2,
  leaderName: "",
  leaderEmail: "",
  leaderPhone: "",
  college: "Jeppiaar Institute of Technology",
  department: "",
  year: "",
  domain: "",
  idea: "",
  website: "", // honeypot
};

const blankMembers = (n) => Array.from({ length: n }, () => ({ name: "", email: "" }));

function Field({ label, id, error, children }) {
  return (
    <div className={"field" + (error ? " invalid" : "")}>
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
}

export default function RegistrationForm() {
  const [form, setForm] = useState(initialForm);
  const [members, setMembers] = useState(blankMembers(1));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ message: "", type: "" });
  const [submitting, setSubmitting] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const changeTeamSize = (e) => {
    const size = parseInt(e.target.value, 10);
    setForm((f) => ({ ...f, teamSize: size }));
    setMembers((prev) => {
      const next = blankMembers(size - 1);
      prev.slice(0, size - 1).forEach((m, i) => (next[i] = m));
      return next;
    });
  };

  const setMember = (i, key) => (e) =>
    setMembers((prev) => prev.map((m, idx) => (idx === i ? { ...m, [key]: e.target.value } : m)));

  function validate() {
    const err = {};
    ["teamName", "leaderName", "college", "department", "year", "domain"].forEach((k) => {
      if (!String(form[k]).trim()) err[k] = true;
    });
    if (!emailRe.test(form.leaderEmail.trim())) err.leaderEmail = true;
    if (!phoneRe.test(form.leaderPhone.trim())) err.leaderPhone = true;
    members.forEach((m, i) => {
      if (!m.name.trim()) err["memberName" + i] = true;
      if (!emailRe.test(m.email.trim())) err["memberEmail" + i] = true;
    });
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ message: "", type: "" });

    if (!validate()) {
      setStatus({ message: "Please fill all required fields correctly.", type: "error" });
      return;
    }

    const payload = {
      teamName: form.teamName.trim(),
      teamSize: form.teamSize,
      leaderName: form.leaderName.trim(),
      leaderEmail: form.leaderEmail.trim().toLowerCase(),
      leaderPhone: form.leaderPhone.trim(),
      college: form.college.trim(),
      department: form.department.trim(),
      year: form.year,
      members: members.map((m) => ({ name: m.name.trim(), email: m.email.trim() })),
      domain: form.domain,
      idea: form.idea.trim(),
      website: form.website,
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus({ message: "🎉 Registration successful! See you at QuantiX'26.", type: "success" });
        setForm(initialForm);
        setMembers(blankMembers(1));
        setErrors({});
      } else {
        setStatus({ message: data.error || "Something went wrong. Please try again.", type: "error" });
      }
    } catch {
      setStatus({ message: "Network error. Please check your connection and try again.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={onSubmit} noValidate>
        <div className="form-row">
          <Field label="Team Name *" id="teamName" error={errors.teamName}>
            <input id="teamName" type="text" maxLength={80} value={form.teamName} onChange={set("teamName")} />
          </Field>
          <Field label="Team Size *" id="teamSize">
            <select id="teamSize" value={form.teamSize} onChange={changeTeamSize}>
              <option value={2}>2 Members</option>
              <option value={3}>3 Members</option>
              <option value={4}>4 Members</option>
            </select>
          </Field>
        </div>

        <h4 className="form-heading">Team Leader</h4>

        <div className="form-row">
          <Field label="Full Name *" id="leaderName" error={errors.leaderName}>
            <input id="leaderName" type="text" maxLength={80} value={form.leaderName} onChange={set("leaderName")} />
          </Field>
          <Field label="Email *" id="leaderEmail" error={errors.leaderEmail}>
            <input id="leaderEmail" type="email" maxLength={120} value={form.leaderEmail} onChange={set("leaderEmail")} />
          </Field>
        </div>

        <div className="form-row">
          <Field label="Phone *" id="leaderPhone" error={errors.leaderPhone}>
            <input id="leaderPhone" type="tel" maxLength={15} placeholder="10-digit mobile number"
              value={form.leaderPhone} onChange={set("leaderPhone")} />
          </Field>
          <Field label="College *" id="college" error={errors.college}>
            <input id="college" type="text" maxLength={120} value={form.college} onChange={set("college")} />
          </Field>
        </div>

        <div className="form-row">
          <Field label="Department *" id="department" error={errors.department}>
            <input id="department" type="text" maxLength={80} value={form.department} onChange={set("department")} />
          </Field>
          <Field label="Year *" id="year" error={errors.year}>
            <select id="year" value={form.year} onChange={set("year")}>
              <option value="">Select year</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>
          </Field>
        </div>

        <h4 className="form-heading">Other Team Members</h4>
        {members.map((m, i) => (
          <div className="member-block form-row" key={i}>
            <Field label={`Member ${i + 1} Name *`} id={"memberName" + i} error={errors["memberName" + i]}>
              <input id={"memberName" + i} type="text" maxLength={80} value={m.name} onChange={setMember(i, "name")} />
            </Field>
            <Field label={`Member ${i + 1} Email *`} id={"memberEmail" + i} error={errors["memberEmail" + i]}>
              <input id={"memberEmail" + i} type="email" maxLength={120} value={m.email} onChange={setMember(i, "email")} />
            </Field>
          </div>
        ))}

        <h4 className="form-heading">Project</h4>

        <Field label="Domain *" id="domain" error={errors.domain}>
          <select id="domain" value={form.domain} onChange={set("domain")}>
            <option value="">Select domain</option>
            {DOMAINS.map((d) => (
              <option key={d.name}>{d.name}</option>
            ))}
          </select>
        </Field>

        <Field label="Idea / Problem Statement (optional)" id="idea">
          <textarea id="idea" rows={4} maxLength={1000} value={form.idea} onChange={set("idea")} />
        </Field>

        {/* Honeypot: hidden from humans, bots fill it */}
        <div className="hp" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
        </div>

        <button type="submit" className="primary-btn submit-btn" disabled={submitting}>
          {submitting ? "Submitting..." : "Register Team →"}
        </button>

        <p className={"form-status " + status.type} role="status" aria-live="polite">{status.message}</p>
      </form>
    </div>
  );
}
