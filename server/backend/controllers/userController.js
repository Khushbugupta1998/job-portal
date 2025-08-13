import User from "../models/User.js"

export const uploadResume = async(req, res) =>{
try{
if(!req.file) return res.status(400).json({message:'No file uploaded'})

    const relativePath = `uploads/resumes/${req.file.filename}`

    const updated = await User.findByIdAndUpdate(
        req.user._id,
        {resumeUrl: relativePath},
        {new: true, select:'-password'}
    )

    return res.status(201).json({
        message:'Resume Uploaded',
        resumeUrl:relativePath,
        user:updated
    })


}catch(err){
    return res.status(500).json({message:'Server error'})
}
}