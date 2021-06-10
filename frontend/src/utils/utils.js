const validateInputText = (text) => {
  if (!text || text === '') {
    throw new Error('You should type at least one character.');
  }
  if (text.length > 256) {
    throw new Error('256 characters is the maximum allowed.');
  }
};

const getResponseErrorText = (error) => {
  let errorText = 'We can\'t connect to the server.';
  if (error.response && error.response.data.error && error.response.data.error.includes('quota')) {
    errorText = 'Request for today has been exceeded. Please wait until tomorrow or send an email to l.correa.bruna@gmail.com.';
  }
  return errorText;
};
export { validateInputText, getResponseErrorText };
