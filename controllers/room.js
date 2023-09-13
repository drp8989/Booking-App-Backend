import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom=async(req,res,next)=>{
    const hotelId=req.params.hotelId;
    const newRoom=new Room(req.body)
    
    try {
        const savedRoom=await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId,{
                $push:{rooms:savedRoom._id},
            });
        } catch (error) {
            next(error)            
        }
        res.status(200).json(savedRoom);
    } catch (error) {
        next(error)
    }
};
export const updateRoomAvailability = async (req, res, next) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
  };
export const getRoom=async(req,res,next)=>{
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room)       
    } catch (error) {
        next(error)
    }
 


};
export const getAllRoom=async(req,res,next)=>{
     
    // const failed=true
    // if(failed){
    //     return next(createError(404,"Not found"))
    // }
    
    try {
        const rooms=await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        next(error)
    }
};
export const updatedRoom=async(req,res,next)=>{
    try {
        const updatedRoom=await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedRoom);        
    } catch (error) {
        res.status(500).json(error);
        
    }
    
};
export const deleteRoom=async(req,res,next)=>{
    try {
        const deletedRoom=await Room.findByIdAndDelete(req.params.id,{new:true});
        res.status(200).json(deletedRoom);        
    } catch (error) {
        res.status(500).json(error);
        
    }
};