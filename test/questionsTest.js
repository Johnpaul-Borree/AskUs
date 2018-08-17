import chai from 'chai';
import chaiHttp from 'chai-http';

import router from '../server';
// import questions from '../api/models/questionsModels';


const should = chai.should();

chai.use(chaiHttp);

describe('Questions API integration testing', () => {
  describe('#GET: /api/questions', () => {
    it('should get all questions', (done) => {
      chai.request(router)
        .get('/api/questions')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
        });

      done();
    });
  });

  describe('#GET: /api/questions/:questionId', () => {
    it('should get a single question', (done) => {
      chai.request(router)
        .get('/api/questions/3')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('questionBy');
          res.body.should.have.property('AddedOn');
          res.body.should.have.property('answers');
          res.body.should.have.property('Topics');
          res.body.should.have.property('answersGiven');
        });

      done();
    });
    it('should return "There is no question with the given id"', (done) => {
      chai.request(router)
        .get('/api/questions/20')
        .end((err, res) => {
          res.should.have.status(404);
        });

      done();
    });
  });
});
