// Function to catch asynchronous errors and pass them to the global error handler
exports.catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}