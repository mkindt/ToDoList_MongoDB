var mongoose = require("mongoose"),
    TodoSchema,
    Todo;

mongoose.connect("mongodb://localhost/todo");

TodoSchema = new mongoose.Schema({
    "item": String,
    "cats" : [String]
});

Todo = mongoose.model("Todo", TodoSchema);

Todo.findOne({}, function (err, result) {
    if (err !== null) {
	console.log(err);
    } else if (result === null) {
	var t = new Todo({
	    "item": "stand up",
	    "cats": ["fun","exercise"]
	});

	t.save(function (err) {
	    if (err !== null) {
		console.log(err);
	    }
	});
    }
});

module.exports = Todo;