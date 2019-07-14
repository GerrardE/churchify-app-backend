import express from 'express';
import debug from 'debug';
import logger from 'morgan';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import apis from '@routes/api';
import swaggerSpec from './config/swagger';

const debugged = debug('index');
config();

const index = express();
const port = process.env.PORT || 4000;

index.use(logger('dev'));
index.use(bodyParser.json());
index.use(bodyParser.urlencoded({
  extended: true
}));

index.use('/api/v1', apis);

// swagger-ui-express for API endpoint documentation
index.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

index.listen(port, () => {
  debugged(`Listening from port ${port}`);
});

export default index;
