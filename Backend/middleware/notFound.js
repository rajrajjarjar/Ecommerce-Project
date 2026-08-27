const notFound = (req, res, next) => {
    res.status(404).send("No Such route exist!!!");

}
module.exports = notFound