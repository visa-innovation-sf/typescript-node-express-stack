import dotenv from 'dotenv';
import path from 'path';

interface Config {
    port: number,
    whitelist: string[]
}

const env = process.env.NODE_ENV ?? '';

dotenv.config({
	path: path.resolve(__dirname, env ? `.env.${env}` : '.env'),
});

const config: Config = {
	port: parseInt(process.env.PORT ?? ''),
	whitelist: process.env.WHITELIST ? process.env.WHITELIST.split(',') : [],
};

export default config;
