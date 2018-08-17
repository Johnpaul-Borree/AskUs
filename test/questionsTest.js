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
          res.body.should.be.a('object');
        });

      done();
    });
  });
});
