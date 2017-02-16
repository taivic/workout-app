const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Category: {type: String, required: true},
  Description: {type: String},
  SetsReps: {type: String},
  Progress: [{
    LastDate: {type: Date},
    Weight: {type: String},
    Notes: {type: String}
  }]
});

workoutSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    name: this.Name,
    category: this.Category,
    description: this.Description,
    setsReps: this.SetsReps,
  };
}

const Workouts = mongoose.model('Workouts', workoutSchema);

module.exports = {Workouts};