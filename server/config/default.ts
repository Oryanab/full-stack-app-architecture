import 'dotenv/config';

export default {
    port: process.env.PORT || 8080,
    dbUri: process.env.MONGO_URI,
    hashSalt: parseInt(process.env.HUSH_SALT!),
    privateKey: process.env.PRIVATE_KEY,
    accessTokenTtl: process.env.ACCESS_TOKEN_TTL || '15m',
    origin: process.env.ORIGIN || 'http://localhost:3000',
    admins: ['oryan@managbl.ai']
};
