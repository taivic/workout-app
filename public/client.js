var getData = function(tags) {
    $.ajax({
        url: 'http://localhost:8080/workouts',
        type: 'get',
        dataType: 'jsonp',
        jsonp: 'jsonp', // mongod is expecting the parameter name to be called "jsonp"
        success: showResults(data),
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('error', errorThrown);
        }
    })
}

function showResults(result) { //this waits for the ajax to return with a succesful promise object
    var searchResults = showSearchResults(request.tagged, result.items.length);

    $('.search-results').html(searchResults);
    //$.each is a higher order function. It takes an array and a function as an argument.
    //The function is executed once for each item in the array.
    $.each(result.items, function(i, item) { 
        var question = showQuestion(item);
        $('.results').append(question);
    });
}

$(document).ready(function() {
	
	var workouts = [];

	$("#workoutForm").submit(function(e) {
    	e.preventDefault();
    	var name = $("#name").val();
    	var category = $("#category").val();
    	var setsReps = $("#setsReps").val();
    	var lastDate = $("#lastDate").val();
   		var weight = $("#weight").val();
    	var notes = $("#Notes").val();
        //ajax call- post

        $("#workoutList").append("<a><li class='workoutName text-info'>" + 
        name + "</li></a>");

        var Workout = function(name, category, setsReps, lastDate, weight, notes) {
    	this.name = name;
    	this.category = category;
    	this.setsReps = setsReps;
    	this.lastDate = lastDate;
    	this.weight = weight;
    	this.notes = notes;
    }

    var newWorkout = new Workout(name, category, setsReps, lastDate, weight, notes);
    workouts.push(newWorkout);

    resetForm();
    console.log(workouts);
  });

  $(document).on("click", ".workoutName", function() {
    var selectedWorkout = findWorkout($(this).text());
    console.log(selectedWorkout);
    $("#workoutDetail").empty();
    $("#workoutDetail").append("<p>" + 
        selectedWorkout.name + "<br>" +
        selectedWorkout.category + "<br>" +
        selectedWorkout.setsReps + "<br>" +
        selectedWorkout.lastDate + "<br>" +
        selectedWorkout.weight + "<br>" +
        selectedWorkout.notes + "</p>");

  })

  function resetForm() {
    $("#name").val("");
    $("#category").val("");
    $("#setsReps").val("");
    $("#lastDate").val("");
    $("#weight").val("");
    $("#notes").val("");
  }
})

