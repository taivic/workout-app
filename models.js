const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Category: {type: String, required: true},
  SetsReps: {type: String},
  Progress: [{
    LastDate: {type: Date},
    Weight: {type: String},
    Notes: {type: String}
  }]
});

const Workouts = mongoose.model('Workouts', workoutSchema);

module.exports = {Workouts};