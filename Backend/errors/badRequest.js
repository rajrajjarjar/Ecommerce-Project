const CustomAPIERROR = require('./CustomApiError')
const { StatusCodes } = require('http-status-codes')
class badRequest extends CustomAPIERROR {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;

    }
}
module.exports = badRequest;