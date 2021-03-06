"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const {DATABASE_URL, PORT} = require('./config');
const {Workouts} = require('./models');

const app = express();
app.use(express.static('public'));

app.use(morgan('common'));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

app.get('/workouts', (req, res) => {
  Workouts
    .find()
    .exec()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

app.get('/workouts/:id', (req, res) => {
  Workouts
    .findById(req.params.id)
    .exec()
    .then(post => res.json(post))
    .catch(err => {
      res.status(500).json({error: 'something went horribly awry'});
    });
});

app.post('/workouts', (req, res) => {
  const requiredFields = ['name', 'category'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      return res.status(400).send(message);
    }
  }

  Workouts
    .create({
      name: req.body.name,
      category: req.body.category,
      setsReps: req.body.setsReps,
      lastDate: req.body.lastDate,
      weight: req.body.weight,
      notes: req.body.notes
    })
    .then(workout => res.status(201).json(workout))
    .catch(err => {
      res.status(500).json({error: 'Something went wrong'});
    });
});

app.put('/workouts/:id', (req, res) => {
  if (req.params.id !== req.body.id) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['name', 'category', 'setsReps', 'lastDate', 'weight', 'notes'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Workouts
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .exec()
    .then(updatedPost => res.status(201).json(updatedPost))
    .catch(err => res.status(500).json({message: 'Something went wrong'}));
});

app.delete('/workouts/:id', (req, res) => {
  Workouts
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.status(204).json({message: 'success'});
    })
    .catch(err => {
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {runServer, app, closeServer};
