const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');
const should = chai.should();
chai.use(chaiHttp);

describe('Workouts', function() {
  before(function() {
    return runServer();
  });
  after(function() {
    return closeServer();
  });

  it('should list items on GET', function() {
    return chai.request(app)
      .get('/workouts')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.at.least(1);
        const expectedKeys = ['_id', 'name', 'category', 'setsReps'];
        res.body.forEach(function(item) {
          item.should.be.a('object');
          item.should.include.keys(expectedKeys);
        });
      });
  });

  it('should add an item on POST', function() {
    const newItem = {
      name: 'Burpees',
      category: 'Total Body',
      setsReps: '3 Sets of 4',
    };
    return chai.request(app)
      .post('/workouts')
      .send(newItem)
      .then(function(res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys('name', 'category', 'setsReps', 'progress');
        res.body.id.should.not.be.null;
        res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id}));
      });
  });

  it('should update items on PUT', function() {
    const updateData = {
      name: 'Military Press',
      category: 'Shoulder',
      setsReps: '4 sets of 10 reps',
    };
    return chai.request(app)
      .get('/workouts')
      .then(function(res) {
        updateData.id = res.body[1].id;
        return chai.request(app)
          .put(`/workouts/${updateData.id}`)
          .send(updateData);
      })
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.deep.equal(updateData);
      });
  });

  it('should delete items on DELETE', function() {
    return chai.request(app)
      .get('/workouts')
      .then(function(res) {
        return chai.request(app)
          .delete(`/workouts/${res.body[0].id}`);
      })
      .then(function(res) {
        res.should.have.status(204);
      });
  });
});