import { NextFunction, Request, Response } from "express";
import { Token } from "../../domain/Token"
import { TokenException } from "../../utils/Error/TokenException";

export class Middleware {
  static isValid(req: Request) {
    const token = req.cookies.token
    if (token) {
      const result = Token.Decode(token);
      if (result!) {
        return result["data"]
      }
    }
    throw new TokenException("NOT_AUTHENTICATED")
  }
  static isAdmin(req: Request, res: Response, next: NextFunction) {
    const result = Middleware.isValid(req)
    if (!result["isAdmin"]) throw new TokenException("NOT_AUTHENTICATED")
    next()
  }

  static isValidToUser(req: Request, res: Response, next: NextFunction) {
    const result = Middleware.isValid(req)
    if (!(result["id"] === req.params.id || result["isAdmin"])) throw new TokenException("NOT_AUTHENTICATED")
    next()
  }
}