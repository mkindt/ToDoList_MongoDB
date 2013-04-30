var mongoose = require("mongoose"),
    TodoSchema,
    Todo;

mongoose.connect("mongodb://localhost/development");

TodoSchema = new mongoose.Schema({
    "item": String,
    "cats" : String
});

Todo = mongoose.model("Todo", TodoSchema);

Todo.findOne({}, function (err, result) {
    if (err !== null) {
	console.log(err);
    } else if (result === null) {
	var t = new Todo({
	    "item": "Bill",
	    "cats": 42
	});

	t.save(function (err) {
	    if (err !== null) {
		console.log(err);
	    }
	});
    }
});

module.exports = Todo;