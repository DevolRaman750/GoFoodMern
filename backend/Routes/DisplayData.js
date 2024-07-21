const express = require("express");
const router = express.Router();

router.post('/foodData', (req,res)=>{
    try{
        res.send([global.food_items,global.foodCategory]) //food_items is globally stored
    }catch(error){
        console.error(error.message);
        res.send("Server Error")

    }
})
module.exports = router;