/*global $, console, window, document, jQuery*/
(function () {
  'use strict';
  var $, $doc, toDoItems, tabCheck, setUpClickHandler, target, deleteTab1, listClasses, newItem, allCategories, foundToDo;
  $ = window.$;

  $(document).ready(function () {
    toDoItems = 6;
    tabCheck = 0;
    deleteTab1 = [];
    function deleteButton() {
      $(".deleter").click(function() {
        deleteTab1 = $(this).parent().attr("class").split(" ");
        deleteTab1.splice(0, 1);
        $("#tab1").find("." + deleteTab1).parent().hide("scale", function() {
          $("#tab1").find("." + deleteTab1).parent().remove();
        });
        console.log("got hre " + deleteTab1);
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
        listClasses = $("#newCats").val().split(",");
        newItem = $("#newToDo").val();
        toDoItems = toDoItems + 1;
        var post_object = {};
        if (newItem === "" || listClasses === "") {
	        alert("include a todo and some categories");
	      } else {
	        post_object.item = newItem;
	        post_object.cats = listClasses;
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
        toDoItems = toDoItems + 1;
        $("#toDo").append("<div class='" + todo.cats.join(' ') + "' style = 'display:none'><div class='left toDoItem" + toDoItems + "'>" + todo.item + "<input name='submit' type='image' class = 'deleter' src='images/delete-icon.png'/></div><div class = 'right'><div class = 'cats'>" + todo.cats + "</div></div></div>");
        $("#toDo").children().slideDown(1000);
      });
      deleteButton();
	    //addPersonToList(todo);
	    //$(".people_list").append("<p>"+person.name+" "+person.age+"</p>");
    });
    
    $.getJSON("json/all.json", function (todos) {
      todos.forEach(function (todo) {
        toDoItems = toDoItems + 1;
        $("#toDo").append("<div class='" + todo.categories.join(' ') + "' style = 'display:none'><div class='left toDoItem" + toDoItems + "'>" + todo.description + "<input name='submit' type='image' class = 'deleter' src='images/delete-icon.png'/></div><div class = 'right'><div class = 'cats'>" + todo.categories + "</div></div></div>");
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