import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

import { AppDataSource } from '../data-source';
import { User } from '../entity/users.entity';
import { IUserInfo } from '../models/user.model';
import { TOKEN_PRIVATE_KEY } from '../settings';

export interface CustomRequest extends Request {
  user?: IUserInfo;
}

export const authentication = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const UserRepository = AppDataSource.getRepository(User);
  const accessToken = req.cookies['access-token'];

  if (!accessToken) return res.status(401).send({ message: 'Token Not found' });

  // JWT 검증
  try {
    jwt.verify(accessToken, TOKEN_PRIVATE_KEY!);
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError)
      return res.status(401).send({ message: 'SESSION_EXPIRED' });
    return res.status(401).send({ message: 'INVALID_TOKEN' });
  }

  // JWT Decode
  const decodedToken = jwt.decode(accessToken);
  if (typeof decodedToken === 'string' || decodedToken === null)
    res.status(401).send({ message: 'Invalid token payload' });

  const { id } = decodedToken as IUserInfo;
  const user = await UserRepository.findOneBy({ id: Number(id) });

  if (!user) return res.status(404).send({ message: 'User not found' });

  req.user = {
    email: user.email,
    id: user.id,
  };

  next();
};
