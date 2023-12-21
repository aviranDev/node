import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Define log levels with associated numeric values
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Determine the log level based on the environment
const level = () => {
  // Get the NODE_ENV environment variable, default to '--development'
  const env = process.argv[2] || '--development';

  // Check if the environment is '--development', set log level to 'debug', otherwise 'warn'
  const isDevelopment = env === '--development';
  return isDevelopment ? 'debug' : 'warn';
};

// Define log colors for each log level
winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
});

// Create a custom log format
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

// Create transports for log files
const logTransport = [
  // Output log messages to the console for immediate visibility
  new winston.transports.Console(),

  // Implement daily log rotation for error logs
  new DailyRotateFile({
    level: 'error',
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d', // Keep logs for 14 days
  }),

  // Implement daily log rotation for all logs (including errors)
  new DailyRotateFile({
    filename: 'logs/all-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  }),
];


// Create a logger instance with specified configuration
const logger = winston.createLogger({
  level: level(), // Set log level based on environment
  levels, // Use the defined log levels for consistency
  format, // Apply the custom log format
  transports: logTransport, // Utilize the defined transports for log storage
});

// Export the logger instance for consistent usage across the application
export default logger;