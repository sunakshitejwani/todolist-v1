const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var item = "";

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
  //res.send("Hello");
  var today = new Date();
  var options = {
      weekday:"long",
      day:"numeric",
      month:"long"
  }

  var day = today.toLocaleDateString("en-US",options);

  res.render("list", { kindofDay: day, newListItem:item });
});

app.post("/",function(req,res){
    item = req.body.newItem;
    //res.render("list",{newListItem:item});
    res.redirect("/");
})

app.listen(3000, function() {
  console.log("server is running on port 3000");
});
