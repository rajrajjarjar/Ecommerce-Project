const badRequest = require('./badRequest');
const CustomAPIERROR = require('./CustomApiError');
const unauthanticated = require('./unauthanticated');
module.exports = {
    badRequest,
    CustomAPIERROR,
    unauthanticated
}