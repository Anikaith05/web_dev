const mongoose=require('mongoose');

const campgrounds= new mongoose.Schema({
        city: String,
        growth_from_2000_to_2013: String,
        latitude: Number,
        longitude: Number,
        population: String,
        rank: String,
        state: String,
});

const CampGround= mongoose.model("CampGround",campgrounds);

module.exports= CampGround;
