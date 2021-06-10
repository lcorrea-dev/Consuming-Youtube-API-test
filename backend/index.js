import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import apiRouter from './routes/api.js';

dotenv.config();

if (!process.env.YOUTUBE_API_TOKEN) {
    throw new Error(
        'Improperly configured. You need to pass an YOUTUBE_API_TOKEN via environment variables.'
    );
}

const acceptedOrigin = process.env.ACCEPTED_ORIGIN_HOST || '*';
const corsOptions = {
    origin: acceptedOrigin,
    optionsSuccessStatus: 200,
};
const port = process.env.PORT || 8081;
const app = express();

app.use(cors(corsOptions));
app.use(morgan('tiny'));
app.use(express.json());

app.use('', apiRouter);

app.use((error, req, res, next) => {
    if (error.status) {
        res.status(error.status);
    } else {
        res.status(500);
    }
    res.json({
        error: error.message,
        stack:
            process.env.NODE_ENV === 'PRODUCTION' ? 'Forbidden' : error.stack,
    });
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening at... http://localhost:${port}`);
});

export default app;
