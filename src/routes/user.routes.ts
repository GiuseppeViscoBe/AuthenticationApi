import express from 'express'
import validateResource from '../middlewares/validateResource'
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema } from '../schemas/user.schema'
import { createUserHandler, forgotPasswordHandler, resetPasswordHandler, verifyUserHandler } from '../controllers/user.controller'

const router = express.Router()

router.post('/users', validateResource(createUserSchema), createUserHandler )
router.post('/users/verify/:id/:verificationCode', validateResource(verifyUserSchema), verifyUserHandler)
router.post("/users/forgotPassword", validateResource(forgotPasswordSchema), forgotPasswordHandler)
router.post("/users/resetPassword/:id/:passwordResetCode", validateResource(resetPasswordSchema), resetPasswordHandler)

export default router