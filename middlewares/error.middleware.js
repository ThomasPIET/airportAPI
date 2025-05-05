export default (error, req, res, next) => {

    // Always returns a JSON response with status code if available
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message
    })
}
