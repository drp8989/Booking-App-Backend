import express from "express";
import Room from "../models/Room.js";
import {verifyAdmin} from "../utils/verifyToken.js";
import { createRoom,getRoom,getAllRoom,updatedRoom,deleteRoom,updateRoomAvailability } from "../controllers/room.js";

const router=express.Router();

//CREATE
router.post("/:hotelId",verifyAdmin,createRoom);
//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id",verifyAdmin,updatedRoom)
//READ ALL
router.get("/",getAllRoom);
//READ BY ID
router.get("/:id",getRoom);
//DELETE
router.delete("/:id",verifyAdmin,deleteRoom)

export default router