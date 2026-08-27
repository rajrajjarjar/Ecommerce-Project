const CustomAPIERROR = require('./CustomApiError');
const { StatusCodes } = require('http-status-codes');
class unauthanticated extends CustomAPIERROR {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}
module.exports = unauthanticated;
