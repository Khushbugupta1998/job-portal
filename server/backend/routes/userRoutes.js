import express from 'express';
import { authorizeRoles, protect } from '../middleware/authMiddleware.js';
import { resumeUpload } from '../middleware/uploadMiddleware.js';
import { uploadResume } from '../controllers/userController.js';


const router = express.Router()

router.post('/me/resume', protect, authorizeRoles('user', 'recruiter', 'admin'), resumeUpload, uploadResume)

export default router