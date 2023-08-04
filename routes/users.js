import express from "express";
import user from "../models/User.js";
import {createUser,getUser,getAllUser,updatetUser,deleteUser} from "../controllers/user.js"; 
import { verifyToken, verifyUser,verifyAdmin } from "../utils/verifyToken.js";

const router=express.Router();

//CHECK
router.get("/checkAuthentication",verifyToken,(req,res,next)=>{
    res.send("Hello you are logged in");

});
//Check User
router.get("/checkUser/:id",verifyUser,(req,res,next)=>{
    res.send("Hello this is logged in!");
});
router.get("/checkAdmin/:id",verifyAdmin,(req,res,next)=>{
    res.send("Hello Admin");
});
//CREATE
router.post("/",createUser);
//UPDATE
router.put("/:id",updatetUser)
//READ ALL
router.get("/",getAllUser);
//READ BY ID
router.get("/:id",getUser);
//DELETE
router.delete("/:id",deleteUser)

export default router