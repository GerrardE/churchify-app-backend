import { createLogger, transports } from 'winston';

const level = process.env.LOG_LEVEL || 'debug';

const logger = createLogger({
  transports: [
    new transports.Console({
      level,
      timestamp: () => (new Date()).toISOString(),
    })],
});

export default logger;
