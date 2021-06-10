import chai from 'chai';
import fs from 'fs';
import { decodeHTMLEntities, parseYoutubeResponse } from './utils.js';
const expect = chai.expect;

let youtubeResponse = fs.readFileSync('./jsonResponse/youtubeData.json');
let youtubeResponseData = JSON.parse(youtubeResponse);

describe('Utils tests', () => {
    it('All HTML Entities should be translated', () => {
        const decodedString = decodeHTMLEntities('&nbsp;&amp;&quot;&lt;&gt;');
        expect(decodedString).to.equal(' &"<>');
    });
    it('Youtube API response should be parsed correctly', () => {
        const parsedResponse = parseYoutubeResponse(youtubeResponseData);
        expect(parsedResponse).to.have.all.keys(
            'nextPageToken',
            'count',
            'items'
        );
        expect(parsedResponse.nextPageToken).to.be.an('string');
        expect(parsedResponse.count).to.be.an('number');
        expect(parsedResponse.items).to.be.an('array');
    });
});
