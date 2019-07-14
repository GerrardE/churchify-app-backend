import swaggerJsdoc from 'swagger-jsdoc';
import { config } from 'dotenv';

// Initialize dotenv
config();

// deine host url
const host = process.env.HOST_NAME || 'localhost:5000';

// Swagger Definitions
const swaggerDefinition = {
  info: {
    title: 'TremDev',
    version: '1.0.0',
    description: 'TremDev helps TREM HQ manage report submissions from all her branches all over the world.',
  },
  host,
  basePath: '/api/v1'
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['/swagger.yaml']
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
