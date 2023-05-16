import config from './configurations';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import router from './routers';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.whitelist }));
 
app.get('/', (_req, res) => {
	res.send('Welcome to VCXC POC Backend Service');
});
app.use('/', router);

app.listen(config.port);
