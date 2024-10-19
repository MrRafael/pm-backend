export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  frontendURL: process.env.FRONTEND_URL,
  fileLocation: process.env.FILE_LOCATION,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    duration: process.env.JWT_DURATION || '60s',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshDuration: process.env.JWT_REFRESH_DURATION || '1d',
  },
  email: {
    service: process.env.EMAIL_SERVICE,
    email: process.env.EMAIL_ADDRESS,
    password: process.env.EMAIL_PASSWORD,
  },
});
