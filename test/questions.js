import chai from 'chai';
import chaiHttp from 'chai-http';

import router from '../src/server';

const should = chai.should();

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('Questions', () => {
  const tokenObject = {};
  const lastCreatedQuest = {};

  before((done) => {
    const user = {
      email: 'testpass@gmail.com',
      password: 'mypassword345',
    };
    chai.request(router)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        tokenObject.token = res.body.token;
        done();
      });
  });

  describe('POST /questions', () => {
    it('should generate token', (done) => {
      tokenObject.should.be.a('object');
      tokenObject.should.have.property('token').not.eql('');
      done();
    });

    it('Should create a question on /questions route and return status code 200', (done) => {
      const question = {
        token: tokenObject.token,
        questionBody: 'What is a RESTFUL API?',
      };
      chai.request(router)
        .post('/api/v1/questions')
        .send(question)
        .end((err, res) => {
          lastCreatedQuest.id = res.body.justAdded.id;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('justAdded').be.a('object');
          res.body.justAdded.should.have.property('created_at').not.eql('');
          res.body.should.have.property('message').eql('Created');
          done(err);
        });
    });
    
    it("Should not create a question when token didn't match", (done) => {
      // cannot create question, token didi not match
      const question = {
        token: '56hhhi88090990-09jjhbbbtggbll*nbkj',
        questionBody: 'How to use css3 frameworks',
      };
      chai.request(router)
        .post('/api/v1/questions')
        .send(question)
        .end((err, req) => {
          req.should.have.status(401);
          req.body.should.be.a('object');
          req.body.should.have.property('message').eql('Failed to authenticate');
          done(err);
        });
    });
  });

  describe('GET /questions', () => {
    it('Should list all questions on /questions', (done) => {
      chai.request(router)
        .get('/api/v1/questions')
        .send({ token: tokenObject.token })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('questions').be.a('array');
          res.body.should.have.property('status').eql('success');
          done();
        });
    });
  });

  describe('GEt /questions/:questionId', () => {
    it('Should not get a question with id not equall to question id', (done) => {
      const questionId = 300;
      chai.request(router)
        .get(`/api/v1/questions/${questionId}`)
        .send({ token: tokenObject.token })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.property('message').eql('no result found');
          done();
        });
    });

    it('Should get a single question /questions/:questionId status code 200', (done) => {
      console.log(lastCreatedQuest.id);
      const questionId = lastCreatedQuest.id;
      chai.request(router)
        .get(`/api/v1/questions/${questionId}`)
        .send({ token: tokenObject.token })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          done();
        });
    });
  });
  describe('POST /questions/questionId/answers', () => {

    it("Should not create a answer when token didn't match", (done) => {
      // cannot create question, token did not match
      const questionId = lastCreatedQuest.id;
      const answer = {
        token: '56hhhi88090990-09jjhbbbtggbll*nbkj',
        answerBody: 'My answers here',
      };
      chai.request(router)
        .post(`/api/v1/questions/${questionId}/answers`)
        .send(answer)
        .end((err, req) => {
          req.should.have.status(401);
          req.body.should.be.a('object');
          req.body.should.have.property('message').eql('Failed to authenticate');
          done(err);
        });
    });
  });
  
  describe('DELETE /questions/:questionId', () => {
    it('Should not delete an entry returns status code 404', (done) => {
      const questionId = 100;
      chai.request(router)
        .delete(`/api/v1/questions/${questionId}`)
        .send({ token: tokenObject.token })
        .end((err, req) => {
          req.should.have.status(404);
          req.body.should.be.a('object');
          req.body.should.have.property('message').eql('The question with the given id was not found');
          done(err);
        });
    });

    it('Should delete a question and return status code 200', (done) => {
      const questionId = lastCreatedQuest.id;
      chai.request(router)
        .delete(`/api/v1/questions/${questionId}`)
        .send({ token: tokenObject.token })
        .end((err, req) => {
          req.should.have.status(200);
          req.body.should.be.a('object');
          req.body.should.have.property('status').eql('success');
          done(err);
        });
    });
  });
});
