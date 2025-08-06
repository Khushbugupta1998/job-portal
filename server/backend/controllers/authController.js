export const registerUser = async(req, res) =>{
try{
res.status(200).json({message:'Register User - yet to be implemented'})
}catch(error){
    res.status(500).json({ error: error.message });

}
}

export const loginUser = async(req, res) =>{
try{
res.status(200).json({message:'Login User - yet to be implemented'})
}catch(error){
    res.status(500).json({ error: error.message });

}
}