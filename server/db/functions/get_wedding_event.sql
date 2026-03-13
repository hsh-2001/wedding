DROP FUNCTION IF EXISTS get_wedding_event(INT);

CREATE FUNCTION get_wedding_event(p_company_id INT)
RETURNS TABLE (
    id UUID,
    company_id INT,
    bride_name VARCHAR(150),
    groom_name VARCHAR(150),
    wedding_date TIMESTAMP,
    venue_name VARCHAR(200),
    venue_address TEXT,
    description TEXT,
    event_name VARCHAR(150),
    event_date TIMESTAMP,
    location TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        w.id,
        w.company_id,
        w.bride_name,
        w.groom_name,
        w.wedding_date,
        w.venue_name,
        w.venue_address,
        w.description,
        we.event_name,
        we.event_date,
        we.location,
        w.created_at,
        w.updated_at
    FROM weddings w
    LEFT JOIN wedding_events we
    ON w.id = we.wedding_id
    WHERE w.company_id = p_company_id;
END;
$$;