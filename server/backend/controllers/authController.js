import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }

    )
}

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name , email and password are required' })
        }

        // prevent assigning admin from frontend
        const requestedRole = role && role === 'recruiter' ? 'recruiter' : 'user'

        // 3. check if user exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'User with this email already exists' })
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassowrd = await bcrypt.hash(password, salt)

        // create user
        const user = await User.create({
            name,
            email,
            password: hashPassowrd,
            role: requestedRole
        })
        const token = generateToken(user)
        return res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error' })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
console.log(req.body)
        // basic validation

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password is required' })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Invalid Credential' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Credential' })
        }

        const token = generateToken(user)

        return res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });


    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
}