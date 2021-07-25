const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
var items = [];
var workItems = [];

app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todoListDB", {
  useNewUrlParser: true
});

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your to-list"
});

const item2 = new Item({
  name: "Hit the + button to add a new item"
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

// Item.insertMany(defaultItems,function(err){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Successfully saved default items to DB");
//   }
// })

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  Item.find({}, function(error, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved default items to DB");
        }
      });
      res.redirect("/");
    }
    res.render("list", { listTitle: "Today", newListItems: foundItems });
  });
});

app.post("/", function(req, res) {
  const itemName = req.body.newItem;

  const item = new Item({
    name:itemName
  });

  item.save();

  res.redirect("/");

});

app.get("/work", function(req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("server is running on port 3000");
});
