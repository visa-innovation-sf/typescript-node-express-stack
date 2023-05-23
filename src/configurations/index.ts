import dotenv from 'dotenv';
import path from 'path';

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

const env = process.env.NODE_ENV ?? '';

dotenv.config({
  path: path.resolve(__dirname, env ? `.env.${env}` : '.env'),
});

const config: Config = {
  aws: {
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '.env',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    },
    region: process.env.AWS_REGION,
  },
  port: parseInt(process.env.PORT ?? ''),
  whitelist: process.env.WHITELIST ? process.env.WHITELIST.split(',') : [],
};

export default config;
