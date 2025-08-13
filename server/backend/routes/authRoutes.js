import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import multer from 'multer'
const upload = multer()


const router = express.Router()

router.post('/register', upload.none(), registerUser)
router.post('/login', upload.none(), loginUser)
export default router