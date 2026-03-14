-- DROP TABLE IF EXISTS guests;
CREATE TABLE guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wedding_id UUID,
    group_id UUID,
    name VARCHAR(100),
    title VARCHAR(250),
    phone VARCHAR(20),
    email VARCHAR(50),
    invitation_code VARCHAR(30),
    remark TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    UNIQUE (wedding_id, invitation_code)
);