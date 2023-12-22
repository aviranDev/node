import { createLogger, format, transports, addColors } from 'winston';

// Define custom colors
const customColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue'
};

// Set custom colors
addColors(customColors);

// Create a logger with a custom format
const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.colorize({ all: true }), // Add colors to all log levels
    format.simple() // This is not strictly necessary
  ),
  transports: [
    new transports.File({ filename: 'logs/api.log', level: 'info' }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.Console({
      level: 'debug'
    })
  ],
});

export { logger };