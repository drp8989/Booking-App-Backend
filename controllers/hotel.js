
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel=async(req,res,next)=>{
    const newHotel=new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }
}
export const getHotel=async(req,res,next)=>{
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel)       
    } catch (error) {
        next(error)
    }
 


};
export const getAllHotel=async(req,res,next)=>{
     
    // const failed=true
    // if(failed){
    //     return next(createError(404,"Not found"))
    // }
    
    try {
        const hotels=await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        next(error)
    }
}
export const getHotels=async(req,res,next)=>{
    // const  {min,max,featured,limit}=req.query
    const {min,max,limit,...other}=req.query

    console.log(req.query)
    try {
        // const hotels = await Hotel.find({
        //     featured,
        //     cheapestPrice: { $gt: min || 1, $lt: max || 999 },
        // }).limit(limit)
        const hotels = await Hotel.find({
            ...other,
            cheapestPrice: { $gt: min || 1, $lt: max || 999 },
        }).limit(limit)
        res.status(200).json(hotels);        
    } catch (error) {
        next(error)
    }
}
export const updatetHotel=async(req,res,next)=>{
    try {
        const updatedHotel=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedHotel);        
    } catch (error) {
        res.status(500).json(error);
        
    }
    
};
export const deleteHotel=async(req,res,next)=>{
    try {
        const deletedHotel=await Hotel.findByIdAndDelete(req.params.id,{new:true});
        res.status(200).json(deletedHotel);        
    } catch (error) {
        res.status(500).json(error);
        
    }
};
export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };
export const countByCity=async(req,res,next)=>{
    //localhost:8800/api/hotel/countByCity?cities=berlin,madrid,london
    const cities=req.query.cities.split(",")
    try {
        const list=await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }));
        res.status(200).json(list);
    } catch (error) {
        next(error)
    }
};
export const countByType=async(req,res,next)=>{
    //localhost:8800/api/hotel/countByType
    try {
        const hotelCount= await Hotel.countDocuments({type:"Hotel"});
        const apartmentCount= await Hotel.countDocuments({type:"apartment"});
        const resortCount= await Hotel.countDocuments({type:"resort"});
        const villaCount= await Hotel.countDocuments({type:"villa"});
        const cabinCount= await Hotel.countDocuments({type:"cabin"});

        res.status(200).json([
            {type:"hotel",count:hotelCount},
            {type:"apartments",count:apartmentCount},
            {type:"resorts",count:resortCount},
            {type:"villas",count:villaCount},
            {type:"cabins",count:cabinCount},
        ]);    
    } catch (error) {
        next(error)
    }
    
};