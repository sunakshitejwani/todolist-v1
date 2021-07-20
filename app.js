const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var items = [];

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

  res.render("list", { kindofDay: day, newListItems:items });
});

app.post("/",function(req,res){
    var item = req.body.newItem;
    //res.render("list",{newListItem:item});
    items.push(item)
    res.redirect("/");
})

app.listen(3000, function() {
  console.log("server is running on port 3000");
});
