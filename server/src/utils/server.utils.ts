import express, { type Express } from 'express';
import cors from 'cors';
import config from 'config';
import cookieParser from 'cookie-parser';
import routes from '../routes';
import path from 'path';

const createServer = (): Express => {
    const app = express();
    app.use(cookieParser());
    app.use(express.json());
    app.use(
        cors({
            origin: config.get<string>('origin'),
            credentials: true
        })
    );
    app.use(express.static(path.join(__dirname, '../../../client/build')));
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../../../client/build/index.html'));
    });

    routes(app);
    return app;
};

export default createServer;
