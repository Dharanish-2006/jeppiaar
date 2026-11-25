-- Run this once in the Neon SQL Editor

CREATE TABLE IF NOT EXISTS registrations (
    id            SERIAL PRIMARY KEY,
    team_name     TEXT        NOT NULL,
    team_size     INTEGER     NOT NULL CHECK (team_size BETWEEN 2 AND 4),
    leader_name   TEXT        NOT NULL,
    leader_email  TEXT        NOT NULL,
    leader_phone  TEXT        NOT NULL,
    college       TEXT        NOT NULL,
    department    TEXT        NOT NULL,
    year          TEXT        NOT NULL,
    members       JSONB       NOT NULL DEFAULT '[]'::jsonb,
    domain        TEXT        NOT NULL,
    idea          TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Prevent duplicate registrations
CREATE UNIQUE INDEX IF NOT EXISTS registrations_leader_email_uidx
    ON registrations (leader_email);

CREATE UNIQUE INDEX IF NOT EXISTS registrations_team_name_uidx
    ON registrations (LOWER(team_name));

-- View all registrations:
-- SELECT * FROM registrations ORDER BY created_at DESC;
