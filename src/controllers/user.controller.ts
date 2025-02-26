import {Request,Response} from 'express'
import { CreateUserInput, ForgotPasswordInput, ResetPasswordInput, VerifyUserInput } from '../schemas/user.schema';
import { createUser, findUserByEmail, findUserById } from '../services/user.service';
import sendEmail from '../utils/mailer';
import log from '../utils/logger';
import { nanoid } from 'nanoid';

export async function createUserHandler(req : Request<{}, {}, CreateUserInput>,res : Response){
    const body = req.body;


    //log.info(body)
    try {
        const user = await createUser(body)

        await sendEmail({
            from: "test@example.com",
            to: user.email,
            subject : "Please verify your account",
            text: `verification code ${user.verificationCode}, Id: ${user._id}`
        })

        res.send("User succesfully created.")
    } catch (error : any) {
        //TO-DO: implement custom error handler middleware
        if(error.code === 11000){
            return res.status(409).send("Account already exists")
        }

        res.status(500).send(error)
    }
}

export async function verifyUserHandler(req: Request<VerifyUserInput>, res : Response){
    log.info("I get here")
    const id = req.params.id
    const verificationCode = req.params.verificationCode

    //find the user by id 
    const user = await findUserById(id)

    if(!user){
        return res.send('Could not verify user.')
    }

    //check to see if they are already verified 
    if(user.verified){
        return res.send("User is already verified.")
    }

    //check to see if th e verification code matches
    if(user.verificationCode == verificationCode){
        user.verified = true

        await user.save()

        return res.send("User succesfully verified.")
    }

    return res.send("Could not verify user.")
}


export async function forgotPasswordHandler(req : Request<{}, {}, ForgotPasswordInput>, res : Response){
    const {email} = req.body
    const message = "If a user with that email is registered you will receive a password reset email"
    const user = await findUserByEmail(email)

    if(!user){
        log.debug(`User with email: ${email} does not exist`)
        //Ritorniamo questo errore che è fuorviante in modo da prevenire che qualcuno testi le email presenti nel nostro sistema
        return res.send(message)
    }

    if(!user.verified){
        return res.send("User is not verified")
    }

    const passwordRestCode = nanoid()

    user.passwordResetCode = passwordRestCode

    await user.save()

    await sendEmail({
        to: user.email,
        from: "test@example.com",
        subject : 'Reset your password',
        text: `Password reset code ${passwordRestCode}. Id ${user.id}`
    })

    log.debug(`Password sent to ${user.email}`)
    return res.send(message)
}


export async function resetPasswordHandler(req : Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>, res : Response){

    const {id, passwordResetCode} = req.params

    const {password} = req.body
    
    const user = await findUserById(id)

    if(!user || !user.passwordResetCode || user.passwordResetCode !== passwordResetCode){
        return res.status(400).send("Could not reset user password")
    }

    user.passwordResetCode = null 

    user.password = password

    await user.save()

    return res.send("Succesfully updated user password")

}