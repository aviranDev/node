import { Request, Response, NextFunction } from 'express';
import logger from '../logger/logger';

/**
 * Error handling middleware responsible for logging errors and sending appropriate responses.
 *
 * This middleware logs detailed error information and responds to clients with the appropriate error status code and message.
 * @param {Error} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 */
const errorHandler = function (err: Error, req: Request, res: Response, next: NextFunction): void {
  try {
    // Handle Resource Not Found (404) Error
    logger.error(err.message);

    // Respond with the appropriate status code, message, and error details
    res.status(500).json({
      message: err.message,
    });


  } catch (error) {
    // Handle any errors that might occur during the response generation
    res.status(500).json({
      error: {
        status: 500,
        name: "Internal Server Error",
        message: "An unexpected error occurred while processing the request.",
      },
    });
  }
}

// Export the middlewares functions
export { errorHandler };