const decodeHTMLEntities = (encodedString) => {
    // Returns a decoded from HTML entities string.
    // @param {String} encodedString
    // @return {String} decodedString
    const translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    const translate = {
        nbsp: ' ',
        amp: '&',
        quot: '"',
        lt: '<',
        gt: '>',
    };
    const decodedString = encodedString
        .replace(translate_re, function (match, entity) {
            return translate[entity];
        })
        .replace(/&#(\d+);/gi, function (match, numStr) {
            const num = parseInt(numStr, 10);
            return String.fromCharCode(num);
        });
    return decodedString;
};

const parseYoutubeResponse = (response) => {
    // Adapt a Youtube API List response to only get the parameters
    // we will via get requests.
    // @param {Object} response
    // @return {Object} parsedResponse
    const { nextPageToken, items } = response;

    const itemsList = items.map((el) => {
        const youtubeLink = 'https://www.youtube.com/watch?v=' + el.id.videoId;
        return {
            url: youtubeLink,
            title: decodeHTMLEntities(el.snippet.title),
            description: decodeHTMLEntities(el.snippet.description),
            thumbnail: el.snippet.thumbnails.high.url,
        };
    });
    const parsedResponse = {
        nextPageToken,
        count: itemsList.length,
        items: itemsList,
    };
    return parsedResponse;
};

const checkIfParamIsValid = (param, res) => {
    // Check if a parameter length is valid. If not, send a response 404.
    // @param {String} parameter
    // @param {Response object} res
    if (param.length > 256) {
        res.status(404).json({
            error: 'Param length must be between 1 and 256 characters.',
        });
    }
};

const checkIfQuotaExceeded = (message) => {
    // Throw an error if message corresponds to QuotaExceededError from Youtube API.
    // @param {String} message
    if (
        message ===
        'The request cannot be completed because you have exceeded your <a href="/youtube/v3/getting-started#quota">quota</a>.'
    ) {
        throw new Error('The quota for YOUTUBE API has been exceeded.');
    }
};
export {
    parseYoutubeResponse,
    checkIfParamIsValid,
    checkIfQuotaExceeded,
    decodeHTMLEntities,
};
