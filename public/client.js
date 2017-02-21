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

    $("#workoutList").append("<a><li class='workoutName text-info'>" + 
      name + "</li></a>");

    var newWorkout = new workout(name, category, setsReps, lastDate, weight, notes);
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