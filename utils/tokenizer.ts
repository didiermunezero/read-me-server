import * as jwt from 'jsonwebtoken'

export async function returnToken(req){
    const token = req.headers["token"];

  if (token) {
    try {
      return await jwt.verify(token, "jwtencryptionkey");
    } catch (e) {
    }
  }
}