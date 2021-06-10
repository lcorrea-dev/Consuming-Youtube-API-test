import express from 'express';
import {
    getVideosByKeywords,
    getNextPageYoutubeAPI,
} from '../requests/youtubeApi.js';

import { parseYoutubeResponse, checkIfParamIsValid } from '../utils.js';

const apiRouter = express.Router();

apiRouter.get('/api/v1/youtube-search/:keywords', async (req, res, next) => {
    // Search for a list of Youtube Videos that match the :keywords.
    const { keywords } = req.params;
    checkIfParamIsValid(keywords, res);
    try {
        const result = await getVideosByKeywords(keywords);
        const parsedResponse = parseYoutubeResponse(result);
        res.send(parsedResponse);
    } catch (error) {
        next(error);
    }
});

apiRouter.get(
    '/api/v1/youtube-search/:keywords/:nextPageToken',
    async (req, res, next) => {
        // Search for a list of Youtube Videos that match the :keywords and is the next page of a response.
        const { keywords, nextPageToken } = req.params;
        checkIfParamIsValid(keywords, res);
        checkIfParamIsValid(nextPageToken, res);
        try {
            const result = await getNextPageYoutubeAPI(keywords, nextPageToken);
            const parsedResponse = parseYoutubeResponse(result);
            res.send(parsedResponse);
        } catch (error) {
            next(error);
        }
    }
);

export default apiRouter;
