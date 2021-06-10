import axios from 'axios';
import { checkIfQuotaExceeded } from '../utils.js';

const getVideosByKeywords = async (keywords) => {
    // Returns a response for the Youtube API, with a list of videos that match some keywords.
    // @param {String} keywords
    // @return {Object} data
    const searchEndpoint = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=36&q=${keywords}&type=video&key=${process.env.YOUTUBE_API_TOKEN}`;
    return axios
        .get(searchEndpoint)
        .then((response) => response.data)
        .catch((error) => {
            checkIfQuotaExceeded(error.response.data.error.message);
            throw new Error(error.message);
        });
};

const getNextPageYoutubeAPI = async (keywords, nextPageToken) => {
    // Returns a response for the Youtube API, using nextPageToken provided by getVideosByKeywords or this function.
    // @param {String} keywords
    // @return {String} nextPageToken
    // @return {Object} data
    const searchEndpoint = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=36&q=${keywords}&pageToken=${nextPageToken}&type=video&key=${process.env.YOUTUBE_API_TOKEN}`;
    return axios
        .get(searchEndpoint)
        .then((response) => response.data)
        .catch((error) => {
            checkIfQuotaExceeded(error.response.data.error.message);
            throw new Error(error.message);
        });
};

export { getVideosByKeywords, getNextPageYoutubeAPI };
