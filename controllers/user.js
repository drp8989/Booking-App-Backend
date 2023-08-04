import User from "../models/User.js";


export const createUser=async(req,res,next)=>{
    const newUser=new User(req.body)
    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        next(error)
    }
}
export const getUser=async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user)       
    } catch (error) {
        next(error)
    }
 


}
export const getAllUser=async(req,res,next)=>{
     
    // const failed=true
    // if(failed){
    //     return next(createError(404,"Not found"))
    // }
    
    try {
        const user=await User.find();
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
};
export const updatetUser=async(req,res,next)=>{
    try {
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedUser);        
    } catch (error) {
        res.status(500).json(error);
        
    }
    
};
export const deleteUser=async(req,res,next)=>{
    try {
        const deletedUser=await User.findByIdAndDelete(req.params.id,{new:true});
        res.status(200).json(deletedUser);        
    } catch (error) {
        res.status(500).json(error);
        
    }
};