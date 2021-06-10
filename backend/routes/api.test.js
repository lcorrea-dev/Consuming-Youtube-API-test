import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe('Router tests', () => {
    it('Get all the videos by keywords, parsed', (done) => {
        chai.request(app)
            .get('/api/v1/youtube-search/fun')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.count).to.equal(36);
                expect(res.body.nextPageToken).to.equal('CCQQAA');
                done();
            });
    });
    it('Get all the videos by keywords, getting the next page, parsed', (done) => {
        chai.request(app)
            .get('/api/v1/youtube-search/fun/CCQQAA')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.count).to.equal(36);
                expect(res.body.nextPageToken).to.equal('CEgQAA');
                done();
            });
    });
});
