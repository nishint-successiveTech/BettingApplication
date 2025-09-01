import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env["JWT_SECRET"] || "SECRET_KEY";

interface JwtPayload {
  id: string;
  email: string;
  role?: string;
}

export interface IAuthRequest extends Request {
  user?: JwtPayload;
}

class AuthMiddleware {
  public static authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

      (req as IAuthRequest).user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  public static authorize(roles: string[] = []) {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = (req as IAuthRequest).user;
      if (!user) return res.status(401).json({ message: "Not authenticated" });
      if (roles.length && (!user.role || !roles.includes(user.role))) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    };
  }
}

export default AuthMiddleware;
