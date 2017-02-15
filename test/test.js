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
      .get('/exercises')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.at.least(1);
        const expectedKeys = ['name', 'category', 'description', 'sets and reps', 'progress'];
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
      description: 'Stand up, jump down and do a pushup, tuck your legs in, then explode upwards. Repeat.',
      setsReps: '3 Sets of 4',
      Progress: [{
        lastDate: 'Monday, Feb 13th', 
        Weight: 'None', 
        Notes: 'First try, it was hard.'
      }]
    };
    return chai.request(app)
      .post('/posts')
      .send(newItem)
      .then(function(res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys('name', 'category', 'description', 'sets and reps', 'progress');
        res.body.id.should.not.be.null;
        res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id}));
      });
  });

  it('should update items on PUT', function() {
    const updateData = {
      name: 'Burpees',
      category: 'Total Body',
      description: 'Stand up, jump down and do a pushup, tuck your legs in, then explode upwards. Repeat.',
      setsReps: '3 Sets of 4',
      Progress: [{
        lastDate: 'Wednesday, Feb 15th', 
        Weight: 'None', 
        Notes: 'Second try, it was a lot easier than the first. Might up some reps next time.'
      }]
    };
    return chai.request(app)
      .get('/posts')
      .then(function(res) {
        updateData.id = res.body[0].id; //need to fix res.body[last item]
        return chai.request(app)
          .put(`/posts/${updateData.id}`)
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
      .get('/posts')
      .then(function(res) {
        return chai.request(app)
          .delete(`/posts/${res.body[0].id}`); //need to fix res.body[last item]
      })
      .then(function(res) {
        res.should.have.status(204);
      });
  });
});