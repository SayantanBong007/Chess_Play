// Custom error class for handling application errors
class AppError extends Error {
    // Constructor for creating a new AppError instance
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        // Capture the stack trace for the error
        Error.captureStackTrace(this, this.constructor)
    }
}

// Export the AppError class for external use
module.exports = AppError;