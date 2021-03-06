var getData = function() {
    var output;
    $.ajax({
        url: '/workouts',
        type: 'get',
        dataType: 'json',
        jsonp: 'json',
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                output = data[i].name;
                $(".workoutList").append("<li class='workoutName text-info' data-id='"+data[i]._id+"'><a><span class='workoutSpecific'>" + 
                    output + 
                    "</span></a>" + 
                    "<button class='temp delete btn btn-danger btn-xs'>Delete</button>" +
                    "<button class='temp edit btn btn-warning btn-xs'>Edit</button>" +
                    "</li>"
                );
            }                           
        },
        error: function(error) {
            $("#results").append("Error");
        }
    });
};

var workouts = [];

$(document).ready(function() {
    //AJAX GET
    getData();
    $(".update").hide();

	$("#workoutForm").submit(function(e) {
    	e.preventDefault();
        var workout = {};
    	workout.name = $("#name").val();
    	workout.category = $("#category").val();
    	workout.setsReps = $("#setsReps").val();
    	workout.lastDate = $("#lastDate").val();
   		workout.weight = $("#weight").val();
    	workout.notes = $("#notes").val();

        $.ajax({     
            url: "/workouts",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(workout),
            dataType: "json",
            success: function(result) {
                var output = result.name;
                $(".workoutList").append("<li class='workoutName text-info' data-id='"+result._id+"'><a><span class='workoutSpecific'>" + 
                    output + 
                    "</span></a>" + 
                    "<button class='temp delete btn btn-danger btn-xs'>Delete</button>" +
                    "<button class='temp edit btn btn-warning btn-xs'>Edit</button>" +
                    "</li>"
                );
            },
            error: function(error) {
                $(".workoutList").append("Error")
            }
        });

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
    });

    function resetForm() {
        $("#name").val("");
        $("#category").val("");
        $("#setsReps").val("");
        $("#lastDate").val("");
        $("#weight").val("");
        $("#notes").val("");
    }

    function findWorkout(id) {
        $.ajax({
            url: '/workouts/' + id,
            type: 'get',
            dataType: 'json',
            jsonp: 'json',
            success: function(data) {
                showDetails(data);
            },
            error: function(error) {
                $("#results").append("Error")
            }
        });
    };

    var showDetails = function(selectedWorkout){
        $("#workoutDetail").empty();
        $("#workoutDetail").append("<p>" + 
            selectedWorkout.name + "<br>" +
            selectedWorkout.category + "<br>" +
            selectedWorkout.setsReps + "<br>" +
            selectedWorkout.notes + "<br>" +
            selectedWorkout.weight + "<br>" +
            selectedWorkout.lastDate.slice(0, 10) + "</p>");
     }

    $(document).on("click", ".workoutSpecific", function() {
        findWorkout($(this).closest("li").attr("data-id"));        
    });

    $(document).on('mouseenter', '.workoutName', function() {
        $(this).find("button").removeClass("temp");
    });
    $(document).on('mouseleave', '.workoutName', function() {
        $(this).find("button").addClass("temp");
    });

    var putId;

    $(document).on("click", ".edit", function() {
        //GET info from workoutID
        putId = $(this).parent().attr("data-id");
        //use workoutID to populate input fields
        function findWorkout(putId) {
            $.ajax({
                url: '/workouts/' + putId,
                type: 'get',
                dataType: 'json',
                jsonp: 'json',
                success: function(data) {
                     //populate inputs with object
                    $("#name").val(data.name); 
                    $("#category").val(data.category);
                    $("#setsReps").val(data.setsReps);
                    $("#notes").val(data.notes);
                    $("#weight").val(data.weight);
                    $("#lastDate").val(data.lastDate.slice(0, 10));
                    //show update button
                    $(".add").hide();
                    $(".update").show();
                },
                error: function(error) {
                    $("#results").append("Error")
                }
            });
        };

        findWorkout(putId);
    });
        
    //make ajax PUT call when update is clicked
     $(document).on("click", ".update", function() {
        var workout = {};
        workout.name = $("#name").val();
        workout.category = $("#category").val();
        workout.setsReps = $("#setsReps").val();
        workout.lastDate = $("#lastDate").val();
        workout.weight = $("#weight").val();
        workout.notes = $("#notes").val();
        workout.id = putId;

        $.ajax({
            url: '/workouts/' + putId,
            type: 'put',
            contentType: 'application/json',
            data: JSON.stringify(workout),
            dataType: 'json',
            success: function(result) {
                console.log("update is made");
            },
            error: function(error) {
                $("#results").append("Error")
            }
        });
    });

    $(document).on("click", ".delete", function(workout) {
        //AJAX delete
        var workoutId = $(this).parent().attr("data-id");
        $.ajax({
            url: '/workouts/' + workoutId,
            type: 'delete',
            success: function(result) {
/*                $(this).closest("li").remove();
*/                location.reload();
            },
            error: function(error) {
                $("#results").append("Error")
            }
        });
    });
});

    