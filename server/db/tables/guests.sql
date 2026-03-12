CREATE TABLE guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wedding_id UUID,
    group_id UUID,
    guest_name VARCHAR(150),
    phone VARCHAR(30),
    email VARCHAR(150),
    invitation_code VARCHAR(30) UNIQUE,
    max_guests INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);