
class ResponseHelpers {
    sendResponse(res,data,code = 200, message = "Success") {
        return res.status(code).json({
            code     : code,
            message  : message,
            data     : data
        });
    }

    sendError(res, message, status = 400) {
        return res.status(status).json({
            status,
            message,
        });
    }
}

module.exports = ResponseHelpers