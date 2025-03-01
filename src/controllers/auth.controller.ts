import { Request, Response } from "express";
import { CreateSessionInput } from "../schemas/auth.schema";
import { findUserByEmail } from "../services/user.service";
import { signAccessToken, signRefreshToken } from "../services/auth.service";

export async function createSessionHandler(req: Request<{}, {}, CreateSessionInput>, res: Response) {
    const {email, password} = req.body

    const user = await findUserByEmail(email)
    const message = 'Invalid email or password'


    if(!user){
        return res.send()
    }

    if(!user.verified){
        return res.send("Please verify your email")
    }

    const isValid = await user.validatePassword(password)

    if(!isValid){
        return res.send(message)
    }

    //sign an access token
    const accessToken = signAccessToken(user)

    //sign a refresh token
    const refreshToken = await signRefreshToken({userId: user._id})
    //send the tokens
    return res.send({
        accessToken,
        refreshToken
    })
}
