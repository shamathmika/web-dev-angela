//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

const newTodoItems = [];
const newWorkItems = [];

app.get("/", function(req, res) {

    const day = date.getDate();
    res.render("list", {
        listTitle: day,
        newListItems: newTodoItems
    }); // what this does is: looks for a file called list.ejs in a folder called views.
    //uses that to render and replaces the keyword listTitle with day
});

app.get("/work", function(req, res){
    res.render("list", {
        listTitle: "Work List",
        newListItems: newWorkItems
    });
});

app.post("/", function(req, res){
    const item = req.body.inputTodo;
    if (req.body.button === "Work") {
        newWorkItems.push(item);
        res.redirect("/work");
    } else {
        newTodoItems.push(item);
        res.redirect("/");
    }
});

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(3000, function(req, res) {
    console.log("Server is running in port 3000!");
});




//Note:
// <!-- < % lets you add if else "code" in html (ejs) -->
// <% if(listTitle === "Satruday" || listTitle === "Sunday") { %>
//     <!-- < %= lets you put a variable that can be referenced and manipulated from the js (ejs) -->
//     <h1 style="color:purple"><%= listTitle %> ToDo List</h1>
// <% } else { %> <!-- Add else in the same line as closing if tag "}". It throws error otherwise.
//     Even though two "code" lines are consecutive add the < % tags in each line (ejs) -->
//     <h1 style="color:blue"><%= listTitle %> ToDo List</h1>
// <% } %>
