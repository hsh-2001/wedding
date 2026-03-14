import connection from '../config/connection';

const getGuestsByWeddingId = async (wedding_id: string) => {
  const sql = `SELECT * FROM guests WHERE wedding_id = $1 ORDER BY created_at ASC`;
  const params = [wedding_id];
  try {
    const guests = await connection.getData(sql, params);
    return {
      isSuccess: true,
      data: guests,
      message: 'Guests fetched successfully',
    };
  } catch (error: any) {
    return {
      isSuccess: false,
      data: null,
      message: error.message || 'Failed to fetch guests',
    };
  }
};

export default {
  getGuestsByWeddingId,
};
