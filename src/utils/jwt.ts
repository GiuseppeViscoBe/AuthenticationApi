import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config()
export function signJwt(object : Object, keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey', options?: jwt.SignOptions | undefined){

    const signingKey = Buffer.from(String(process.env[keyName]), "base64")

    return jwt.sign(object,signingKey, {
        ...(options && options),
        algorithm : "RS256"
    })
}

export function verifyJwt<T>(token : string, keyName : "ACCESS_TOKEN_PUBLIC_KEY" | "REFRESH_TOKEN_PUBLIC_KEY"): T | null{
    const publicKey = Buffer.from(String(process.env[keyName]), "base64")
    
    try {
        const decoded = jwt.verify(token, publicKey) as T
        return decoded
    } catch (error) {
        return null
    }
}
