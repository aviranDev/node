import { createLogger, format, transports, addColors } from 'winston';
const isProduction = process.argv[2] === '--production';

// Define custom colors
const customColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue'
};

// Set custom colors
addColors(customColors);

const logger = createLogger({
  // ... other configurations ...
  transports: [
    new transports.Console({ level: isProduction ? 'info' : 'debug' }),
    isProduction ? null : new transports.File({ filename: 'logs/api.log', level: 'info' }),
    isProduction ? null : new transports.File({ filename: 'logs/error.log', level: 'error' }),
  ].filter(Boolean),
});

export { logger }; 