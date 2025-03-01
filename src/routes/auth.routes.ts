import express from 'express'
import validateResource from '../middlewares/validateResource'
import { createSessionSchema } from '../schemas/auth.schema'
import { createSessionHandler } from '../controllers/auth.controller'

const router = express.Router()

router.post('/session', validateResource(createSessionSchema), createSessionHandler)

export default router