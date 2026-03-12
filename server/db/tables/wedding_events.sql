CREATE TABLE wedding_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wedding_id UUID,
    event_name VARCHAR(150) NOT NULL,
    event_date TIMESTAMP NOT NULL,
    location TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    UNIQUE (wedding_id, event_name, event_date)
);