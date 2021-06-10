import { expect } from 'chai';
import { validateInputText, getResponseErrorText } from '@/utils/utils';

describe('Test utils functions', () => {
  it('throws an error if the input text is empty', () => {
    const inputText = '';
    expect(() => validateInputText(inputText)).to.throw(Error);
  });
  it('throws an error if the input text is longer than 256 chars', () => {
    const inputText = 'A'.repeat(257);
    expect(() => validateInputText(inputText)).to.throw(Error);
  });
  it('get the correct error message if there is no response', () => {
    const fakeError = new Error('FAKE ERROR');
    const errorText = getResponseErrorText(fakeError);
    expect(errorText).to.be.eq('We can\'t connect to the server.');
  });
  it('get the correct error message if there is no quota left on the API', () => {
    const fakeError = new Error();
    fakeError.response = {
      data: {
        error: 'quota',
      },
    };
    const errorText = getResponseErrorText(fakeError);
    expect(errorText).to.be.eq('Request for today has been exceeded. Please wait until tomorrow or send an email to l.correa.bruna@gmail.com.');
  });
});
