import  express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
//routes
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js"
import hotelRoute from "./routes/hotels.js"
import roomRoute from "./routes/rooms.js"


const app=express();
dotenv.config();
app.use(cookieParser());

const connect=async()=>{
      mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Connected to MongoDB');
        // Start your application or perform database operations here.
      })
      .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });
}

mongoose.connection.on("connected",()=>{
    console.log("MongoDB connected")
  })

mongoose.connection.on("disconnected",()=>{
  console.log("MongoDB disconnected")
})
  

  
//middlewares
app.use(express.json())
app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/hotels",hotelRoute);
app.use("/api/rooms",roomRoute);

//error handling middleware
app.use((err,req,res,next)=>{
  const errorStatus=err.status||500;
  const errorMessage=err.message||"Something went wrong";
  return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack,
  });

});

app.listen(8800,()=>{
    connect()

})