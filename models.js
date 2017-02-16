const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Category: {type: String, required: true},
  Description: {type: String},
  setsReps: {type: String},
  Progress: [{
    Last Date: {type: Date},
    Weight: {type: String},
    Notes: {String}
  }]
});

blogPostSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    name: this.Name,
    category: this.category,
    Description: this.description
    setsReps: this.setsReps,
  };
}

const Workouts = mongoose.model('Workouts', workoutSchema);

module.exports = {Workouts};