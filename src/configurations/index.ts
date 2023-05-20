import dotenv from 'dotenv';
import path from 'path';

interface Config {
	aws: {
		credentials: {
			accessKeyId: string;
			secretAccessKey: string;
		};
	};
    port: number,
	region?: string;
    whitelist: string[];
}

const env = process.env.NODE_ENV ?? '';

dotenv.config({
	path: path.resolve(__dirname, env ? `.env.${env}` : '.env'),
});

const config: Config = {
	aws: {
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
		},
	},
	port: parseInt(process.env.PORT ?? ''),
	region: process.env.REGION,
	whitelist: process.env.WHITELIST ? process.env.WHITELIST.split(',') : [],
};

export default config;
