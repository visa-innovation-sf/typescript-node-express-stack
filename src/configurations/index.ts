import dotenv from 'dotenv';

interface Config {
  aws: {
    credentials: {
      accessKeyId: string;
      secretAccessKey: string;
    };
    region?: string;
  };
  port: number;
  whitelist: string[];
}

dotenv.config();

const config: Config = {
  aws: {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    },
    region: process.env.AWS_REGION,
  },
  port: parseInt(process.env.PORT ?? ''),
  whitelist: process.env.WHITELIST ? process.env.WHITELIST.split(',') : [],
};

export default config;
