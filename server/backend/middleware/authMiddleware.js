import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization || req.headers.Authorization;
        let token;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1]
        }
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, token missing' });

        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = User.findById(decode.id).select('-password')
        next()

    } catch (error) {
        return res.status(401).json({ message: 'Not Authorized, token invalid' })
    }
}


export const authorizeRoles = (...allowedRoles) => {
    console.log(allowedRoles, 'allowed')
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(401).json({ message: 'Not authorized' })
        }

        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({message:'Forbidden: insufficient Role'})
        }

        next()
    }
}