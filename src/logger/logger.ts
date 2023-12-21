import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs';

const logsDir = process.env.LOGS_DIR || '/logs/';

// Ensure the log directory exists or create it
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

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

// Check if the file system is writable
const isWritableFileSystem = () => {
  try {
    // Attempt to create a temporary directory to check if the file system is writable
    fs.mkdirSync(path.join(logsDir, 'test'));
    fs.rmdirSync(path.join(logsDir, 'test'));
    return true;
  } catch (error) {
    return false;
  }
};

// Create transports for log files based on the file system writability
const logTransport = isWritableFileSystem()
  ? [
    // Output log messages to the console for immediate visibility
    new winston.transports.Console(),

    // Implement daily log rotation for error logs
    new DailyRotateFile({
      level: 'error',
      filename: path.join(logsDir, 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),

    // Implement daily log rotation for all logs (including errors)
    new DailyRotateFile({
      filename: path.join(logsDir, 'all-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ]
  : [
    // Use your DailyRotateFile or other transports for a writable file system
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
