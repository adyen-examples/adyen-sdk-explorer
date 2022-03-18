import jwt_decode from 'jwt-decode';
import { Types } from 'mongoose';

type TokenData = {
  user: {
    _id: string;
    username: string;
    password: string;
    email: string;
    merchantAccounts?: [any];
    configurations?: [any];
  };
};

export const isAuthorizedForAction = (req, res, next) => {
  const userToken: string = req.headers.authorization.split(' ')[1];
  const { userId }: { userId: string } = req.params;
  const tokenData: TokenData = jwt_decode(userToken);
  return tokenData.user._id === userId
    ? next()
    : res.status(401).json({
        code: 401,
        reason: 'Not authorized'
      });
};
