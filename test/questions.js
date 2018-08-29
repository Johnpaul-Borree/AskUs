import chai from 'chai';
import chaiHttp from 'chai-http';

import router from '../src/server';

const should = chai.should();

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('Questions', () => {
  const tokenObject = {};

  before((done) => {
    const user = {
      email: 'udoka@gmail.com',
      password: 'mypassword345',
    };
    chai.request(router)
      .post('/auth/login')
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
      chai.request(server)
        .post('/questions')
        .send(question)
        .end((err, req) => {
          req.should.have.status(200);
          req.body.should.be.a('object');
          req.body.should.have.property('justAdded').be.a('object');
          req.body.justAdded.should.have.property('created_at').not.eql('');
          req.body.createdEntry.should.have.property('id').be.a('number');
          req.body.should.have.property('message').eql('Created');
          done(err);
        });
    });


    it('Should not create entry when questionBody field is missing', (done) => {
      // No question was entered so, cannot create empty questions
      const question = {
        token: tokenObject.token,
        questionBody: '',
      };
      chai.request(router)
        .post('/questions')
        .send(question)
        .end((err, req) => {
          req.should.have.status(400);
          req.body.should.be.a('object');
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
        .post('/questions')
        .send(question)
        .end((err, req) => {
          req.should.have.status(401);
          req.body.should.be.a('object');
          req.body.should.have.property('message').eql('Error authentication failed');
          done(err);
        });
    });
  });

  describe('GET /questions', () => {
    it('Should list all questions on /questions', (done) => {
      chai.request(router)
        .get('/questions')
        .send({ token: tokenObject.token })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('questions').be.a('object');
          res.body.should.have.property('status').eql('success');
          done();
        });
    });
  });

  describe('GEt /questions/:questionId', () => {
    it('Should not get an entry with id not equall to question id', (done) => {
      const id = 300;
      chai.request(router)
        .get(`/api/questions/${RequestId}`)
        .send({ token: tokenObject.token })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.property('message').eql('Question withthe given id was not found');
          done();
        });
    });

    it('Should get a single question /questions/:questionId status code 200', (done) => {
      const id = 1;
      chai.request(router)
        .get(`/questions/${questionId}`)
        .send({ token: tokenObject.token })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          done();
        });
    });
  });

  describe('DELETE /questions/:questionId', () => {
    it('Should not delete an entry returns status code 404', (done) => {
      const id = 20;
      chai.request(router)
        .delete(`/questions/${questionId}`)
        .send({ token: tokenObject.token })
        .end((err, req) => {
          req.should.have.status(404);
          req.body.should.be.a('object');
          req.body.should.have.property('message').eql('Entry not found');
          done(err);
        });
    });

    it('Should delete a question and return status code 200', (done) => {
      const questionId = 1;
      chai.request(router)
        .delete(`/questions/${questionId}`)
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
