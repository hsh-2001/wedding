DROP FUNCTION IF EXISTS upsert_guest(
    UUID,
    VARCHAR,
    VARCHAR,
    VARCHAR,
    VARCHAR,
    VARCHAR,
    VARCHAR
);

CREATE FUNCTION upsert_guest(
    p_wedding_id UUID,
    p_name VARCHAR,
    p_title VARCHAR,
    p_phone VARCHAR,
    p_email VARCHAR,
    p_invitation_code VARCHAR,
    p_remark VARCHAR
)
RETURNS TABLE (
    status_code INT,
    message TEXT
)
AS $$
BEGIN
    INSERT INTO guests (wedding_id, "name", title, phone, email, invitation_code, remark)
    VALUES (p_wedding_id, p_name, p_title, p_phone, p_email, p_invitation_code, p_remark)
    ON CONFLICT (wedding_id, invitation_code) DO UPDATE
    SET "name" = EXCLUDED."name",
        title = EXCLUDED.title,
        phone = EXCLUDED.phone,
        email = EXCLUDED.email,
        remark = EXCLUDED.remark,
        updated_at = NOW();
    RETURN QUERY SELECT 200, 'Guest upserted successfully';
END;
$$ LANGUAGE plpgsql;