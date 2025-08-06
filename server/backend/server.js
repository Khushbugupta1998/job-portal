import dotenv from 'dotenv';
import connetDB from './config/db.js';
import cors from 'cors';
import express from 'express';
import authRoutes from './routes/authRoutes.js'

dotenv.config()
connetDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

})

