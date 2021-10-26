
module.exports.responseHandler = ({message = '', data = null, statusCode=200, error = null}, responseRef) => {

    return responseRef.status(statusCode).json({
        message,
        statusCode,
        data,
        error
    })
}
