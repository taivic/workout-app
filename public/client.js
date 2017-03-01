var getData = function() {
    $.ajax({
        url: 'http://localhost:8080/workouts',
        type: 'get',
        dataType: 'json',
        jsonp: 'json',
        success: function(result) {
            var output = result.name
            $("#results").append(output);
        },
        error: function(error) {
            $("#results").append("Error")
        }
    })
}

var workouts = [];

$(document).ready(function() {

    //AJAX GET
    getData();


	$("#workoutForm").submit(function(e) {
    	e.preventDefault();
    	var name = $("#name").val();
    	var category = $("#category").val();
    	var setsReps = $("#setsReps").val();
    	var lastDate = $("#lastDate").val();
   		var weight = $("#weight").val();
    	var notes = $("#Notes").val();

        $.ajax({     
            url: "http://localhost:8080/workouts",
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            success: function(result) {
                var output = result.name
                $("#results").append(output);
            },
            error: function(error) {
                $("#results").append("Error")
            }
        });

        $("#workoutList").append("<a><li class='workoutName text-info'>" + 
        name + "</li></a>");

        $(".workoutName").hover(
            function() {
                $(this).append($("<span class='deleteButton'><button class='btn btn-danger btn-xs'>Delete</button></span>"));
            }, function() {
                $( this ).find( "span:last" ).remove();
            }
        );

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

    function findWorkout(name) {
        for (var i=0; i<workouts.length; i++) {
            if (workouts[i].name === name) {
                return workouts[i];
            }
        }
    }