const mongoose = require('mongoose');
const mongoURI = 'mongodb://gofood:raman_69@ac-0gcpycw-shard-00-00.dpmp3tc.mongodb.net:27017,ac-0gcpycw-shard-00-01.dpmp3tc.mongodb.net:27017,ac-0gcpycw-shard-00-02.dpmp3tc.mongodb.net:27017/gofood?ssl=true&replicaSet=atlas-lmkc0r-shard-0&authSource=admin&retryWrites=true&w=majority&appName=gofood ' //add gofood before ? for work
const mongoDB =async()=>{
    await mongoose.connect(mongoURI,{useNewUrlParser : true},async(err,result)=>{
        if(err) console.log("---",err)
        else {
        console.log("connected successfully");
        const fetchdata =  await mongoose.connection.db.collection("food_items");
        fetchdata.find({}).toArray(async function(err,data){
            const foodCategory = await mongoose.connection.db.collection("foodCategory");
            foodCategory.find({}).toArray(function (err,catData){
                if(err) console.log(err);
                else 
                    global.food_items = data;
                    global.foodCategory = catData;
                    console.log(global.food_items);
            })
            // if(err) console.log(err);
            // else 
            //     global.food_items = data;
            //     console.log(global.food_items);
        })

    }
    });

}
module.exports = mongoDB;
