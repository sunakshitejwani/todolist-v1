const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date");
const app = express();
var items = [];
var workItems = [];

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  //res.send("Hello");
  let today = date.getDay();
  res.render("list", { listTitle: today, newListItems: items });
});

app.post("/", function(req, res) {
  var item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
  //res.render("list",{newListItem:item});
});

app.get("/work", function(req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about",function(req,res){
    res.render("about");
})

app.listen(3000, function() {
  console.log("server is running on port 3000");
});
