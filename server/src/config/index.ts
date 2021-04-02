import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  const envConfig = dotenv.config();
  if (envConfig.error) {
    throw envConfig.error;
  }
}

export default {
  port: parseInt(process.env.PORT!, 10),
};
