import express from 'express'
import validateResource from '../middlewares/validateResource'
import { createUserSchema } from '../schemas/user.schema'
import { createUserHandler } from '../controllers/user.controller'

const router = express.Router()

router.post('/users', validateResource(createUserSchema), createUserHandler )

export default router