import express from 'express';
import { authorizeRoles, protect } from '../middleware/authMiddleware.js';
import { resumeUpload } from '../middleware/uploadMiddleware.js';
import { getMe, updateMe, uploadResume } from '../controllers/userController.js';
import multer from 'multer'
const upload = multer()


const router = express.Router()
router.post('/me', protect, authorizeRoles('user', 'recruiter', 'admin'), getMe)
router.put('/me', protect, authorizeRoles('user', 'recruiter', 'admin'), upload.none(), updateMe)
router.post('/me/resume', protect, authorizeRoles('user', 'recruiter', 'admin'), resumeUpload, uploadResume)

export default router