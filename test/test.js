const { expect } = require('chai');
const { chai, chaiHttp, server } = require('./config');

chai.should();
chai.use(chaiHttp);

describe('/GET All Articals', () => {
  it('it should GET all the articals', (done) => {
    chai.request(server)
      .get('/api/v1/articals')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
/*
* Test the /POST route
*/
describe('/POST artical', () => {
  it('it should valid reqest or not', (done) => {
    const artical = {
      nickname: "Warren Buffet",
      content: "Then i will Do it nothing when i scared",
      title: "Joining Ceremonry"
    };
    chai.request(server)
      .post('/api/v1/articals')
      .send(artical)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body).to.be.an('object');
        res.body.should.have.property('success').equal(true)
        done();
      });
  });
});