const data=require("./sample_data.js");
const CampGround=require("./campground.js");
const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const seedData= async ()=>{
    await CampGround.deleteMany({});
    for(let i=0;i<50;i++){
        const num=Math.floor(Math.random()*800);
        const inserted=await CampGround.create(data[num]);
        if(!inserted){
            console.log("Not inserted!");
        }
    }
}

seedData();