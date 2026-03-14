DROP FUNCTION IF EXISTS get_guest_by_event_id(UUID, INT, INT);
CREATE FUNCTION get_guest_by_event_id(p_event_id UUID, p_limit INT, p_offset INT)
RETURNS TABLE (
    id UUID,
    wedding_id UUID,
    group_id UUID,
    name VARCHAR(100),
    title VARCHAR(250),
    phone VARCHAR(20),
    email VARCHAR(50),
    invitation_code VARCHAR(30),
    remark TEXT,
    row_number BIGINT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    current_page INT,
    total_page INT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        g.id, g.wedding_id,
        g.group_id, g.name, g.title,
        g.phone, g.email, g.invitation_code, g.remark,
        ROW_NUMBER() OVER (ORDER BY g.created_at DESC)::BIGINT AS row_number,
        g.created_at, g.updated_at,
        p_offset / p_limit + 1 AS current_page,
        CEIL(COUNT(*) OVER()::NUMERIC / p_limit)::INT AS total_page
    FROM guests g
    WHERE g.wedding_id = p_event_id
    ORDER BY g.created_at DESC
    LIMIT p_limit OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;