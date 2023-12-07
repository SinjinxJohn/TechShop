import {Request,Response,NextFunction} from 'express';
import { validateToken } from '../Services/auth';


declare global {
    namespace Express {
      interface Request {
        user?: any; // Adjust the type according to your user object
      }
    }
  }
  
export function checkforAuthCookie(cookieName:string) {
  return (req:Request, res:Response, next:NextFunction) => {
    const tokenCookieValue = req.cookies[cookieName];

    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      return next();
    } catch (error) {
      // Handle token validation error
      console.error('Token validation error:', error);

      // Depending on your requirements, you might want to send a response to the client
      // For example, you could clear the invalid cookie and proceed
      res.clearCookie(cookieName);
      return next();
    }
  };
}


