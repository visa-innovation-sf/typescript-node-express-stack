import config from './configurations';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

import router from './routers';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.whitelist }));

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello world!');
});
app.use('/', router);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(yaml.load('./api/index.yaml')));

app.all('*', function (_req, res) {
  res.sendStatus(404);
});

app.listen(config.port);
