CREATE TABLE weddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id SERIAL,
    bride_name VARCHAR(150) NOT NULL,
    groom_name VARCHAR(150) NOT NULL,
    wedding_date TIMESTAMP NOT NULL,
    venue_name VARCHAR(200),
    venue_address TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    UNIQUE (company_id, bride_name, groom_name, wedding_date)
);