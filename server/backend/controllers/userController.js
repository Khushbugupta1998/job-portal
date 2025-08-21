import User from "../models/User.js"

export const uploadResume = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' })

        const relativePath = `uploads/resumes/${req.file.filename}`
        const updated = await User.findByIdAndUpdate(
            req.user.id,
            { resumeUrl: relativePath },
            { new: true, select: '-password' }
        )

        return res.status(201).json({
            message: 'Resume Uploaded',
            resumeUrl: relativePath,
            user: updated
        })


    } catch (err) {
        return res.status(500).json({ message: 'Server error' })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        return res.json({ user })
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }

}

export const updateMe = async (req, res) => {
    try {
        const {
            name,
            phone,
            location,
            about,
            skills,          // array of strings
            experienceYears, // number
            company,         // recruiters may set this
            avatarUrl        // optional
        } = req.body
        const updates = {}
        if (name !== undefined) updates.name = name;
        if (phone !== undefined) updates.phone = phone;
        if (location !== undefined) updates.location = location;
        if (about !== undefined) updates.about = about;
        if (Array.isArray(skills)) updates.skills = skills;
        if (experienceYears !== undefined) updates.experienceYears = experienceYears
        if (company !== undefined) updates.company = company
        if (avatarUrl !== undefined) updates.avatarUrl = avatarUrl
        const updated = await User.findByIdAndUpdate(
            req.user.id,
            updates,
            { new: true, select: '-password', runValidators: true }
        )
        return res.status(201).json({ user: updated })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error' })
    }
}