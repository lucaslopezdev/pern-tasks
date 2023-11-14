import Router from 'express-promise-router'
import {
  logout,
  profile,
  signin,
  signup
} from '../controllers/auth.controller.js'
import { isAuth } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/signin', signin)

router.post('/signup', signup)

router.post('/logout', logout)

router.get('/profile', isAuth, profile)

export default router
