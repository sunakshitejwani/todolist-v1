const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/",function(req,res){
    //res.send("Hello");
    var today = new Date();
    if(today.getDay() === 6 || today.getDay() === 0)  {
        res.send("Yay it is weekend!");
    } else {
        res.send("Boo! I have to work!");
    }
});

app.listen(3000,function(){
    console.log("server is running on port 3000");
})