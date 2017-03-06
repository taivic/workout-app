var getData = function() {
    console.log('Retrieving workouts');
    var output;
    $.ajax({
        url: 'http://localhost:8080/workouts',
        type: 'get',
        dataType: 'json',
        jsonp: 'json',
        success: function(data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                output = data[i].name;
                console.log(output);
                $(".workoutList").append("<a><li class='workoutName text-info'>" + output + "</li></a>");
            }           
        },
        error: function(error) {
            $("#results").append("Error")
        }
    });
};

var workouts = [];

$(document).ready(function() {

    //AJAX GET
    getData();

	$("#workoutForm").submit(function(e) {
    	e.preventDefault();
        var workout = {};
    	workout.name = $("#name").val();
    	workout.category = $("#category").val();
    	workout.setsReps = $("#setsReps").val();
    	workout.lastDate = $("#lastDate").val();
   		workout.weight = $("#weight").val();
    	workout.notes = $("#notes").val();
        console.log(workout);

        $.ajax({     
            url: "http://localhost:8080/workouts",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(workout),
            dataType: "json",
            success: function(result) {
                var output = result.name
                $(".workoutList").append("<a><li class='workoutName text-info'>" + output + "</li></a>");
            },
            error: function(error) {
                $(".workoutList").append("Error")
            }
        });

      /*  $(".workoutList").append("<a><li class='workoutName text-info'>" + 
        name + "</li></a>");
*/
        /*var Workout = function(name, category, setsReps, lastDate, weight, notes) {
        	this.name = name;
        	this.category = category;
        	this.setsReps = setsReps;
        	this.lastDate = lastDate;
        	this.weight = weight;
        	this.notes = notes;
        }
    
        var newWorkout = new Workout(name, category, setsReps, lastDate, weight, notes);
        workouts.push(newWorkout);
*/
        resetForm();
    });

    function resetForm() {
        $("#name").val("");
        $("#category").val("");
        $("#setsReps").val("");
        $("#lastDate").val("");
        $("#weight").val("");
        $("#notes").val("");
    }

    function findWorkout(name) {
        for (var i=0; i<workouts.length; i++) {
            if (workouts[i].name === name) {
                return workouts[i];
            }
        }
    }

    $(document).on("click", ".workoutList", function() {
        var selectedWorkout = $(this).text();
        console.log(selectedWorkout);
        /*$("#workoutDetail").empty();
        $("#workoutDetail").append("<p>" + 
            selectedWorkout.name + "<br>" +
            selectedWorkout.category + "<br>" +
            selectedWorkout.setsReps + "<br>" +
            selectedWorkout.lastDate + "<br>" +
            selectedWorkout.weight + "<br>" +
            selectedWorkout.notes + "</p>");*/
    });

    $(document).on("mouseenter", ".workoutName", function() {
        $(this).append(
            $("<span class='deleteButton'><button class='btn btn-danger btn-xs'>Delete</button></span>")
        );
    });

    $(document).on("mouseleave", ".workoutName", function() {
        $( this ).find(".btn-xs").remove();
    });

   /* $(document).on("click", ".editButton", function() {
        //AJAX put
        $.ajax({
            url: 'http://localhost:8080/workouts/:id',
            type: 'put',
            dataType: 'json',
            jsonp: 'json',
            success: function(result) {
                var output = result.name
                $("#results").append(output);
            },
            error: function(error) {
                $("#results").append("Error")
            }
        });
    });*/

    $(document).on("click", ".deleteButton", function(workout) {
        //AJAX delete
        $.ajax({
            url: 'http://localhost:8080/workouts/' + workout.id,
            type: 'delete',
            success: function(result) {
                $(this).find(".workoutName text-info").remove();
            },
            error: function(error) {
                $("#results").append("Error")
            }
        });
    });
});

    