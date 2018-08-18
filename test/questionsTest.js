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
          res.body.should.have.property('question');
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

  describe('#POST: /api/questions', () => {
    it('should Post a question', (done) => {
      const question = {
        questionBy: 'Charles Ugwoke',
        AddedOn: '2018-08-27T18:30:49-0300',
        question: 'How to edit pictures in javascript',
        Topics: ['html', 'javascript', 'css3'],
      };

      chai.request(router)
        .post('/api/questions')
        .send(question)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('answersGiven');
        });
      done();
    });

    it('should return "questionBy length must be at least 3 characters long "', (done) => {
      const question = {
        questionBy: 'xy',
        AddedOn: '2018-05-27T18:30:49-0300',
        question: 'How to edit pictures in C#',
        Topics: ['visual-C#', 'C#'],
      };

      chai.request(router)
        .post('/api/questions')
        .send(question)
        .end((err, res) => {
          res.should.have.status(400);
        });

      done();
    });
  });
});
