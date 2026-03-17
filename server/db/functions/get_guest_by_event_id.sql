DROP FUNCTION IF EXISTS get_guest_by_event_id(UUID, INT, INT, VARCHAR);
CREATE FUNCTION get_guest_by_event_id(p_event_id UUID, p_limit INT, p_offset INT, p_search VARCHAR)
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
    is_invited BOOLEAN,
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
        g.is_invited,
        ROW_NUMBER() OVER (ORDER BY g.created_at DESC)::BIGINT AS row_number,
        g.created_at, g.updated_at,
        p_offset / p_limit + 1 AS current_page,
        CEIL(COUNT(*) OVER()::NUMERIC / p_limit)::INT AS total_page
    FROM guests g
    WHERE g.wedding_id = p_event_id
      AND (p_search = '' OR g.name ILIKE '%' || p_search || '%' OR g.phone ILIKE '%' || p_search || '%')
    ORDER BY g.created_at DESC
    LIMIT p_limit OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;