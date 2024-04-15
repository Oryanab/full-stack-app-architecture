import config from 'config';
import connectDatabase from './utils/connect.utils';
import logger from './utils/logger.utils';
import createServer from './utils/server.utils';

const port = config.get<number>('port');
const app = createServer();

app.listen(port, () => {
    logger.info(`App is running on http://localhost:${port}`);
    try {
        connectDatabase();
    } catch (error) {
        logger.error(error);
    }
});
