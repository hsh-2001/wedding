DROP FUNCTION IF EXISTS upsert_guest(
    UUID,
    UUID,
    VARCHAR,
    VARCHAR,
    VARCHAR,
    VARCHAR,
    VARCHAR,
    VARCHAR,
    BOOLEAN
);

CREATE FUNCTION upsert_guest(
    p_id UUID,
    p_wedding_id UUID,
    p_name VARCHAR,
    p_title VARCHAR,
    p_phone VARCHAR,
    p_email VARCHAR,
    p_invitation_code VARCHAR,
    p_remark VARCHAR,
    p_is_invited BOOLEAN
)
RETURNS TABLE (
    status_code INT,
    message TEXT
)
AS $$
BEGIN
    IF p_id IS NOT NULL THEN
        UPDATE guests
        SET wedding_id = p_wedding_id,
            "name" = p_name,
            title = p_title,
            phone = p_phone,
            email = p_email,
            invitation_code = p_invitation_code,
            remark = p_remark,
            is_invited = p_is_invited,
            updated_at = NOW()
        WHERE id = p_id;
        RETURN QUERY SELECT 200, 'Guest updated successfully';
        RETURN;
    END IF;
    INSERT INTO guests (wedding_id, "name", title, phone, email, invitation_code, remark, is_invited)
    VALUES (p_wedding_id, p_name, p_title, p_phone, p_email, p_invitation_code, p_remark, p_is_invited);
    RETURN QUERY SELECT 200, 'Guest upserted successfully';
END;
$$ LANGUAGE plpgsql;