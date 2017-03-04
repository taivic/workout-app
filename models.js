const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
  name: {type: String, required: true},
  category: {type: String, required: true},
  setsReps: {type: String},
  progress: [{
    lastDate: {type: Date},
    weight: {type: String},
    notes: {type: String}
  }]
});

const Workouts = mongoose.model('Workouts', workoutSchema);

module.exports = {Workouts};