function routes(app) {
 // app.use('/device', require('./routeDevice.js'))
 // app.use('/os', require('./routeOS.js'))
 // app.use('/', require('./routeIndex.js'))
 app.get(`/`, (_req, res) => { res.render('index') })
}

module.exports = routes