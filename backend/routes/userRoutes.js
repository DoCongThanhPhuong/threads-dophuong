import express from 'express'
import {
  followUnFollowUser,
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
  getSuggestedUsers,
  freezeAccount,
  forgotPassword,
  resetPassword
} from '../controllers/userController.js'
import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router()

router.get('/profile/:query', getUserProfile)
router.get('/suggested', protectRoute, getSuggestedUsers)
router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/follow/:id', protectRoute, followUnFollowUser) // Toggle state(follow/unfollow)
router.post('/forgot-password', forgotPassword)
router.put('/reset-password/:token', resetPassword)
router.put('/update/:id', protectRoute, updateUser)
router.put('/freeze', protectRoute, freezeAccount)

export default router
