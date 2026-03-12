CREATE TABLE guest_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wedding_id UUID,
    group_name VARCHAR(100) NOT NULL
);