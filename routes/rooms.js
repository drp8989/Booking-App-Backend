import express from "express";
import Room from "../models/Room.js";
import {verifyAdmin} from "../utils/verifyToken.js";
import { createRoom,getRoom,getAllRoom,updatedRoom,deleteRoom } from "../controllers/room.js";

const router=express.Router();

//CREATE
router.post("/",verifyAdmin,createRoom);
//UPDATE
router.put("/:id",verifyAdmin,updatedRoom)
//READ ALL
router.get("/",verifyAdmin,getAllRoom);
//READ BY ID
router.get("/:id",verifyAdmin,getRoom);
//DELETE
router.delete("/:id",verifyAdmin,deleteRoom)

export default router