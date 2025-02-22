import {Request,Response} from 'express'
import { CreateUserInput } from '../schemas/user.schema';
import { createUser } from '../services/user.service';

export async function createUserHandler(req : Request<{}, {}, CreateUserInput>,res : Response){
    const body = req.body;

    try {
        const user = await createUser(body)

        res.send("User succesfully created.")
    } catch (error : any) {
        //TO-DO: implement custom error handler middleware
        if(error.code === 11000){
            res.status(409).send("Account already exists")
        }

        res.status(500).send(error)
    }
}