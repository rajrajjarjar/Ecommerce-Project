class CustomAPIERROR extends Error {
    constructor(message) {
        super(message)
    }
}
module.exports = CustomAPIERROR;