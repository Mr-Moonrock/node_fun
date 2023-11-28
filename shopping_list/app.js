const express = require('express')
const app = express()
const listRoutes = require('./routes/items')
const ExpressError = require('./expressErrors')
const { logger } = require('./middleware')

app.use(express.json());
app.use(logger)
app.use('/items', listRoutes)

app.use(function (req, res, next) {
    return new ExpressError("Not found", 404)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        error: err.message
    })
})

module.exports = app;