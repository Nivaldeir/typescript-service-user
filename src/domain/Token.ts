import jwt from 'jsonwebtoken';
export class Token {
  static Sign(data: any) {
    return jwt.sign({
      data: data,
    }, process.env.JWT_SECURITY!, { expiresIn: process.env.JWT_EXPIRES_IN ?? "7d" })
  }
  static Decode(token: string) {
    return jwt.verify(token, process.env.JWT_SECURITY!, function (err, decoded) {
      if (err) return
      return decoded
    });
  }
}