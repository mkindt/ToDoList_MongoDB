/*global $, console, window, document, jQuery*/
(function () {
    'use strict';
    var $, $doc, toDoItems, tabCheck, setUpClickHandler, target, deleteTab1, JDelete, my_object, post_object, listClasses, newItem, allCategories, foundToDo;
    $ = window.$;

    $(document).ready(function() {
        toDoItems = 0;
        tabCheck = 0;
        deleteTab1 = [];
        listClasses = [];

        function deleteButton() {
            $(".deleter").click(function() {
                deleteTab1 = $(this).parent().attr("class").split(" ");
                deleteTab1.splice(0, 1);
                $("#tab1").find("." + deleteTab1).parent().hide("scale", function() {
                    $("#tab1").find("." + deleteTab1).parent().remove();
                });
                deleteTab1 = deleteTab1[0];
                JDelete = deleteTab1.substr(8);
                my_object = {};
                my_object.number = JDelete;
                console.log("got hre " + deleteTab1);
                console.log("deleting num " + JDelete);
                $.post("/todos/delete", my_object);
                if (tabCheck === 1) {
                    categorize();
                }
                return false;
            });
        }

        function categorize() {
            allCategories = [];
            foundToDo = [];
            $("#toDo").children().each(function () {
                var listClasses = $(this).attr("class").split(" ");
                console.log(listClasses);
                allCategories = allCategories.concat(listClasses);
            });
            allCategories.sort();
            $.unique(allCategories);
            console.log("singles? " + allCategories);
            $("#tab2").empty();
            $(allCategories).each(function() {
                var showCat = this.toUpperCase();
                $("#tab2").append("<h3>" + showCat + "</h3>");
                $("#toDo").find($("." + this)).clone().appendTo("#tab2");
            });
            deleteButton();
        }

        setUpClickHandler = function (anchor) {
            anchor.click(function () {
                target = $(this).attr("href");
                $("#" + target).css("display", "none");
                $(".active").removeClass("active");
                $(this).addClass("active");
                $("#" + target).addClass("active");
                console.log("hrmm " + target);
                if (target === "tab2") {
                    categorize();
                    tabCheck = 1;
                } else {
                    tabCheck = 0;
                }
                $("#" + target).fadeIn(1000);
                return false;
            });
        };

        function submitButton() {
            $("#newEdit").click(function() {
                console.log($("#newToDo").val());
                console.log($("#newCats").val());
                $.each($("#newCats").val().split(","), function() {
                    listClasses.push($.trim(this));
                });
                newItem = $("#newToDo").val();
                toDoItems = toDoItems + 1;
                post_object = {};
                if (newItem === "" || listClasses === "") {
                    // no problem
                } else {
                    post_object.item = newItem;
                    post_object.cats = listClasses;
                    post_object.number = toDoItems;
                    console.log(post_object);
                    $.post("/todos/new", post_object);
                }

                $("#toDo").append("<div class='" + listClasses.join(' ') + "'><div class='left toDoItem" + toDoItems + "'>" + newItem + "<input name='submit' type='image' class = 'deleter' src='images/delete-icon.png'/></div><div class = 'right'><div class = 'cats'>" + listClasses + "</div></div></div>");
                $("#tab3").append("<div>'" + newItem + "' added.</div>");

                deleteButton();
                return false;
            });
        }

        $.getJSON("/todos.json", function (response) {
            response.forEach(function(todo) {
                console.log(todo);
                if (todo.number > toDoItems) {
                    toDoItems = todo.number;
                }
                $("#toDo").append("<div class='" + todo.cats.join(' ') + "' style = 'display:none'><div class='left toDoItem" + todo.number + "'>" + todo.item + "<input name='submit' type='image' class = 'deleter' src='images/delete-icon.png'/></div><div class = 'right'><div class = 'cats'>" + todo.cats + "</div></div></div>");
                $("#toDo").children().slideDown(1000);
            });
            deleteButton();
        });

        $("#toDo").children().each(function () {
            listClasses = $(this).attr("class").split(" ");
            $(this).css("display", "none");
            $(this).children().append("<input name='submit' type='image' class = 'deleter' src='images/delete-icon.png'/>");
            $(this).append("<div class = 'right'><div class = 'cats'>" + listClasses + "</div></div>");
            $(this).slideDown(1000);
        });

        console.log("about to set up click handlers");
        setUpClickHandler($(".tabs .tab"));
        deleteButton();
        submitButton();

        $doc = $(document);
    });
}(jQuery));