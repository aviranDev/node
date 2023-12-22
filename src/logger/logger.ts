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
    format.colorize({ all: true }),
    format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level.toUpperCase()} ${message}`;
    })
  ),
  transports: [
    new transports.Console({
      level: 'debug'
    })
  ],
});

export { logger };