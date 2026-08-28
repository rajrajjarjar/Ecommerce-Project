const jsonwebtoken = require('jsonwebtoken');
const { unauthanticated } = require('../errors/index_error');


const authIT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(req.headers.authorization)
    console.log("AUTH HEADER:", authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new unauthanticated('no token provided');
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        const { id, username } = decoded;
        req.user = { id, username };
        next();

    } catch (error) {
        throw new unauthanticated('user is not allowed to access');

    }
}
module.exports = authIT;


