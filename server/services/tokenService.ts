import jsonwebtoken from 'jsonwebtoken';
import { IUser } from '../../shared/types/user';

const generateToken  = (user: IUser): string => {
    const config = useRuntimeConfig();
  const secret = config.JWT_SECRET;
  return jsonwebtoken.sign({ uid: user.id, cid: user.company_id, un: user.name, um: user.email }, secret, { expiresIn: config.JWT_EXPIRES_IN });
}

const verifyToken = (token: string): IUser | null => {
    const config = useRuntimeConfig();
  const secret = config.JWT_SECRET;
  try {
    const decoded = jsonwebtoken.verify(token, secret) as { uid: number, cid: number, un: string, um: string };
    return { id: decoded.uid, company_id: decoded.cid, name: decoded.un, email: decoded.um };
  } catch (err) {
    return null;
  }
}

export default {
    generateToken,
    verifyToken
}