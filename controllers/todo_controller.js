var Todo = require("../models/todo.js"),
    TodoController = {};

TodoController.list = function (req, res) {
    Todo.find({}, function (err, todos) {
	if (err !== null) {
	    console.log(err);
	} else {
	    res.json(todos);
	}
    });
};

TodoController.create = function (req, res) {
    var t = new Todo({
	"item":req.body.name,
	"cats":req.body.age
    });

    t.save(function (err, result) {
	if (err !== null) {
	    //send the error
	} else {
	    res.json(result);
	}
    });
};

TodoController.destroy = function (req, res) {
    Todo.findOne({"item":req.body.name}, function (err, todo) {
	if (err !== null) {
	    //handle err
	} else if (todo === null) {
	    //person not found
	} else {
	    todo.remove(function (err) {
		if (err !== null) {
		    //handle err
		}
	    });
	}
    });
};

module.exports = TodoController;
