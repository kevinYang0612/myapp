var express = require('express');
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + "/public"));


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Ybh5211314',
    database : 'join_us'
});

app.get("/", function(req, res)
{
    // find count of users in DB
    var q = "select count(*) as count from users";
    connection.query(q, function(err, results)
    {
        if (err) throw err;
        var count = results[0].count;
        // res.send("We have " + count + " users in our database");
        res.render("home", {count: count});
    });
    // respond with that count
    // res.send("You have reached the home page");

});

app.post("/register", function(req, res)
{
    var person = { email: req.body.email };
    connection.query('insert into users set?', person, function(err, result)
    {
        if (err) throw err;
        res.redirect("/");
    });
});

app.get("/joke", function(req, res)
{
    res.send("<strong>that's funny!</strong> <em> HAHA</em>.");
    // res.render("home");
    console.log("requested the joke route");
});

app.get("/random_num", function(req, res)
{
    var num = Math.floor(Math.random() * 10) + 1;
    res.send("Your lucky number is " + num);
});


app.listen(8082, function()
{
    console.log("Server running on 8082!");
});