import {Request, Response, NextFunction} from "express"
const deserializeUser = (req: Request, res : Response, next : NextFunction) => {

    const accessToken = req.header.authorization 
}

