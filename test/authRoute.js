import chai from 'chai';
import chaiHttp from 'chai-http';
import pool from '../src/dbScema/dbConnect';

import router from '../src/server';

const should = chai.should();

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);

describe('Users Authentication', () => {
  before((done) => {
    pool.query(("DELETE from ask_users where email = 'testpass@gmail.com'"))
      .then(() => {
        done();
      })
      .catch(() => done());
  });
  describe('POST /auth/signup', () => {
    it('It should signup user, and asign a token', (done) => {
      const user = {
        username: 'udoka',
        email: 'testpass@gmail.com',
        password: 'mypassword345',
        confirmPassword: 'mypassword345',
      };
      chai.request(router)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('message').eql('Account created Successfully');
          res.body.should.have.property('token').be.a('string');
          done();
        });
    });
    it('It should not signup existing user and should ask for token', (done) => {
      const user = {
        username: 'udoka',
        email: 'testpass@gmail.com',
        password: 'mypassword345',
        confirmPassword: 'mypassword345',
      };
      chai.request(router)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('email exist');
          res.body.should.have.property('status').eql('failed');
          done();
        });
    });
  });

  describe('POST /auth/login', () => {
    it('It should login user, and asing token', (done) => {
      const user = {
        email: 'testpass@gmail.com',
        password: 'mypassword345',
      };
      chai.request(router)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('message').eql('You are logged in!');
          res.body.should.have.property('token').be.a('string');
          done();
        });
    });

    it('It should not login user, email field missing', (done) => {
      const user = {
        password: 'mypassword345',
      };
      chai.request(router)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('failed');
          res.body.should.have.property('message').eql('email is required');
          done();
        });
    });
    it('It should not login user, when password mismatch', (done) => {
      const user = {
        email: 'testpass@gmail.com',
        password: 'mypassword',
      };
      chai.request(router)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('invalid Email or Password');
          res.body.should.have.property('status').eql('failed');
          done();
        });
    });
  });
});