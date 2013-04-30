
var express = require("express")
    , routes = require("./routes")
    , user = require("./routes/user")
    , http = require("http")
    , path = require("path")
    //, redisClient = require("redis").createClient()
    , app = express()
    , tc;

//controller
tc = require("./controllers/todo_controller.js")
//test var mongoose = require("mongoose");
//test mongoose.connect('mongodb://localhost/test');
    
app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));
});

//app.configure('development', function(){
//    app.use(express.errorHandler());
//});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

app.get("/todos.json", tc.list);
app.post("/todos/new", tc.create);
