import express from "express";
import { createHotel,updatetHotel,getAllHotel,deleteHotel,getHotel} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router=express.Router();

//CREATE
router.post("/",verifyAdmin,createHotel);
//UPDATE
router.put("/:id",verifyAdmin,updatetHotel)
//READ ALL
router.get("/",verifyAdmin,getAllHotel);
//READ BY ID
router.get("/:id",verifyAdmin,getHotel);
//DELETE
router.delete("/:id",verifyAdmin,deleteHotel)

export default router;