import dotenv from 'dotenv';
import connetDB from './config/db.js';
import cors from 'cors';
import express from 'express';
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {fileURLToPath} from 'url'
import path from 'path';
dotenv.config()
connetDB()

const app = express()

app.use(cors())
app.use(express.json())
const __fileName = fileURLToPath(import.meta.url)
const __dirName = path.dirname(__fileName)
app.use('/uploads', express.static(path.join(__dirName, 'uploads')))



app.use('/api/auth',  authRoutes)
app.use('/api/auth',  userRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

})

