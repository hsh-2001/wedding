
DROP FUNCTION IF EXISTS upsert_wedding(
    UUID,
    UUID,
    INT,
    VARCHAR,
    VARCHAR,
    TIMESTAMP,
    VARCHAR,
    TEXT,
    TEXT,
    VARCHAR(10)
);

CREATE FUNCTION upsert_wedding(
    p_event_id UUID,
    p_owner_id UUID,
    p_company_id INT,
    p_bride_name VARCHAR,
    p_groom_name VARCHAR,
    p_wedding_date TIMESTAMP,
    p_venue_name VARCHAR,
    p_venue_address TEXT,
    p_description TEXT,
    p_lang_code VARCHAR(10) DEFAULT 'en'
)
RETURNS UUID AS $$
DECLARE
    v_id UUID;
BEGIN
    INSERT INTO weddings (
        event_id, owner_id, company_id, bride_name, groom_name, wedding_date, venue_name, venue_address, description, lang_code, created_at, updated_at
    ) VALUES (
        p_event_id, p_owner_id, p_company_id, p_bride_name, p_groom_name, p_wedding_date, p_venue_name, p_venue_address, p_description, p_lang_code, NOW(), NOW()
    )
    ON CONFLICT (event_id, bride_name, groom_name) DO UPDATE SET
        wedding_date = EXCLUDED.wedding_date,
        venue_name = EXCLUDED.venue_name,
        venue_address = EXCLUDED.venue_address,
        description = EXCLUDED.description,
        lang_code = EXCLUDED.lang_code,
        updated_at = NOW()
    RETURNING id INTO v_id;
    RETURN v_id;
END;
$$ LANGUAGE plpgsql;