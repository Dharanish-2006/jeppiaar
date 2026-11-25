import { neon } from "@neondatabase/serverless";

const DOMAINS = [
    "Artificial Intelligence",
    "Cybersecurity",
    "Healthcare",
    "Sustainability",
    "Education Technology",
    "Open Innovation"
];

const emailRe = /^\S+@\S+\.\S+$/;
const phoneRe = /^[0-9+\-\s]{10,15}$/;
const str = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ error: "Method not allowed." });
    }

    if (!process.env.DATABASE_URL) {
        console.error("DATABASE_URL is not set");
        return res.status(500).json({ error: "Server is not configured." });
    }

    let body = req.body;
    if (typeof body === "string") {
        try { body = JSON.parse(body); } catch { body = {}; }
    }
    body = body || {};

    // Honeypot: pretend success so bots don't retry
    if (body.website) {
        return res.status(200).json({ ok: true });
    }

    const teamName = str(body.teamName, 80);
    const teamSize = parseInt(body.teamSize, 10);
    const leaderName = str(body.leaderName, 80);
    const leaderEmail = str(body.leaderEmail, 120).toLowerCase();
    const leaderPhone = str(body.leaderPhone, 15);
    const college = str(body.college, 120);
    const department = str(body.department, 80);
    const year = str(body.year, 20);
    const domain = str(body.domain, 60);
    const idea = str(body.idea, 1000);

    if (!teamName || !leaderName || !college || !department || !year) {
        return res.status(400).json({ error: "Please fill all required fields." });
    }
    if (!emailRe.test(leaderEmail)) {
        return res.status(400).json({ error: "Enter a valid leader email." });
    }
    if (!phoneRe.test(leaderPhone)) {
        return res.status(400).json({ error: "Enter a valid phone number." });
    }
    if (!(teamSize >= 2 && teamSize <= 4)) {
        return res.status(400).json({ error: "Team size must be 2 to 4." });
    }
    if (!DOMAINS.includes(domain)) {
        return res.status(400).json({ error: "Select a valid domain." });
    }

    const rawMembers = Array.isArray(body.members) ? body.members : [];
    if (rawMembers.length !== teamSize - 1) {
        return res.status(400).json({ error: "Member details do not match team size." });
    }
    const members = rawMembers.map(m => ({
        name: str(m && m.name, 80),
        email: str(m && m.email, 120).toLowerCase()
    }));
    if (members.some(m => !m.name || !emailRe.test(m.email))) {
        return res.status(400).json({ error: "Enter valid name and email for every member." });
    }

    try {
        const sql = neon(process.env.DATABASE_URL);
        await sql`
            INSERT INTO registrations
                (team_name, team_size, leader_name, leader_email, leader_phone,
                 college, department, year, members, domain, idea)
            VALUES
                (${teamName}, ${teamSize}, ${leaderName}, ${leaderEmail}, ${leaderPhone},
                 ${college}, ${department}, ${year}, ${JSON.stringify(members)}::jsonb,
                 ${domain}, ${idea})
        `;
        return res.status(201).json({ ok: true });
    } catch (err) {
        if (err && err.code === "23505") {
            return res.status(409).json({
                error: "This leader email or team name is already registered."
            });
        }
        console.error("DB error:", err);
        return res.status(500).json({ error: "Could not save registration. Try again." });
    }
}
