import multer from 'multer'
import path from 'path'
import fs from 'fs'

const resumesDir = path.resolve('uploads/resumes')
fs.mkdirSync(resumesDir, {recursive: true})

const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, resumesDir)
    },
    filename:(req, file, cb) =>{
    const safeName = file.originalname.replace(/\s+/g, '_'); // avoid spaces    
    cb(null, Date.now() + '-' + safeName)
    }
})


const fileFilter = (req, file, cb) =>{
  const allowed = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
if(allowed.includes(file.mimetype)) cb(null, true)
  else cb(new Error('Only PDF, DOC, DOCX allowed'));
}

export const resumeUpload = multer({storage, fileFilter}).single('file')
