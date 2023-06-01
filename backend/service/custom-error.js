class CustomeErrorHandler extends Error {

    status;
    message;

    constructor(status, msg) {
        super(msg);
        this.status = status;
        this.message = msg;
    }

    static alreadyExists(message) {
        return new CustomeErrorHandler(409, message);
    }

    static customMessage(message) {
        return new CustomeErrorHandler(409, message);
    }

    static notFound(message) {
        return new CustomeErrorHandler(404, message);
    }

    static unauthorized(message) {
        return new CustomeErrorHandler(401, message);
    }

}

module.exports = CustomeErrorHandler;