import express from "express";
import { createHotel,updatetHotel,getAllHotel,deleteHotel,getHotel,countByCity,countByType,getHotels,getHotelRooms} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router=express.Router();

//CREATE
router.post("/",verifyAdmin,createHotel);
//UPDATE
router.put("/:id",verifyAdmin,updatetHotel)
//READ ALL
router.get("/allHotels",verifyAdmin,getAllHotel);
//READ BY ID
router.get("/find/:id",getHotel);
//DELETE
router.delete("/:id",verifyAdmin,deleteHotel)


router.get("/", getHotels);

//get request for home-page
router.get("/countByCity",countByCity)

router.get("/countByType",countByType)
router.get("/room/:id", getHotelRooms);


export default router;