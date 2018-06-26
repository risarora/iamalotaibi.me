'use strict'

var fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    http_module = require('http'),
    path = require('path'),
    app = express(),
    http = http_module.Server(app);
app.set('port', (process.env.PORT || 8000));

// reading json files
var currentPath = process.cwd();
var dataFolder = currentPath + '/data/';
var aboutJSON = JSON.parse(fs.readFileSync(dataFolder + 'about.json', 'utf8'));
var blogJSON = JSON.parse(fs.readFileSync(dataFolder + 'blog.json', 'utf8'));
var labJSON = JSON.parse(fs.readFileSync(dataFolder + 'lab.json', 'utf8'));
var cvJSON = JSON.parse(fs.readFileSync(dataFolder + 'cv.json', 'utf8'));


// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// Set Static Fold
app.use('/', express.static(__dirname + '/public/'));

// Define routes
app.get("/", function(req, res){
  res.render("about", { about: aboutJSON});
});
app.get("/blog", function(req, res){
  res.render("blog", { about: aboutJSON, blog: blogJSON});
});
app.get("/lab", function(req, res){
  res.render("lab", { about: aboutJSON,  lab: labJSON });
});
app.get("/cv", function(req, res){
  res.render("cv",  { about: aboutJSON,  lab: labJSON,  cv: cvJSON });
});
app.get("/contact", function(req, res){
  res.render("contact", { about: aboutJSON});
});
app.get("/mysetup", function(req, res){
  res.render("underwork", { about: aboutJSON});
});
app.get("/underwork", function(req, res){
  res.render("underwork");
});
app.get("*", function(req, res){
  res.render("404");
});
http.listen(app.get('port'), () => {
  console.info('==> 🌎  Go to http://localhost:%s', app.get('port'));
});
