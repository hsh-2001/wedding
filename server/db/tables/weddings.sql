-- DROP TABLE IF EXISTS weddings;

CREATE TABLE weddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL, 
    owner_id UUID NOT NULL,
    company_id INT NOT NULL,
    lang_code VARCHAR(10) DEFAULT 'en',
    bride_name VARCHAR(150) NOT NULL,
    groom_name VARCHAR(150) NOT NULL,
    wedding_date TIMESTAMP NOT NULL,
    venue_name VARCHAR(200),
    venue_address TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    UNIQUE (event_id, bride_name, groom_name)
);