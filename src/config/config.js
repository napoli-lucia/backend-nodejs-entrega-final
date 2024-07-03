import 'dotenv/config'

export const PORT = process.env.PORT || 8080;

export const CLIENT_URL = process.env.CLIENT_URL;

export const {
    // PORT,
    API_PREFIX,
    DB_NAME,
    DB_HOST,
    DB_PORT,
    MONGO_URI,
    SECRET_SESSION,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    SECRET_JWT,
    PERSISTENCE,
    GOOGLE_EMAIL,
    GOOGLE_PSW,
    TIME_EXPIRE_JWT_SESSION,
    TIME_EXPIRE_JWT_CHANGE_PSW
} = process.env;