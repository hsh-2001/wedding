DROP TABLE IF EXISTS events;
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id SERIAL NOT NULL,
    lang_code VARCHAR(10) DEFAULT 'en',
    event_name VARCHAR(150) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    UNIQUE (event_name, company_id)

);