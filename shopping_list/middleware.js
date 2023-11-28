function logger(req, res, next) {
    console.log(`Recieved a ${req.method} request to ${req.path}.`);
    return next();
}

module.exports = { logger }