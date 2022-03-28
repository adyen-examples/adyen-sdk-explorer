import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import jwt_decode from 'jwt-decode';

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

type AuthorizedParams = {
  userId: string;
};

interface AuthorizationRequest<T extends ParamsDictionary> extends Request {
  params: T;
}

export const isAuthorizedForAction = (req: AuthorizationRequest<AuthorizedParams>, res: Response, next: NextFunction) => {
  const userToken: string = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
  const { userId }: { userId: string } = req.params;
  const tokenData: TokenData = jwt_decode(userToken);
  return tokenData.user._id === userId
    ? next()
    : res.status(401).json({
        code: 401,
        reason: 'Not authorized'
      });
};
