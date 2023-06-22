import dotenv from 'dotenv';

interface Config {
  aws: {
    rds: {
      database?: string;
      host?: string;
      id?: string;
      password?: string;
      port: number;
      username?: string;
    };
  };
  port: number;
  whitelist: string[];
}

dotenv.config();

const config: Config = {
  aws: {
    rds: {
      database: process.env.AWS_RDS_DB_NAME,
      host: process.env.AWS_RDS_ENDPOINT,
      id: process.env.AWS_RDS_ID,
      password: process.env.AWS_RDS_PASSWORD,
      port: parseInt(process.env.AWS_RDS_PORT ?? ''),
      username: process.env.AWS_RDS_USERNAME,
    },
  },
  port: parseInt(process.env.PORT ?? ''),
  whitelist: process.env.WHITELIST ? process.env.WHITELIST.split(',') : [],
};

export default config;
