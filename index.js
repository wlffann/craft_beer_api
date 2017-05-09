const express = require('express')
const app = express()
const BeersController = require('./lib/controllers/beersController')
const BreweriesController = require('./lib/controllers/breweriesController')

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Craft Beer API'

app.get('/', (request, response) => {
	response.send(`Welcome to the ${app.locals.title}`)
})

app.get('/beers', (request, response) => {
	BeersController.index(request, response)
})

app.get('/beers/by/:property', (request, response) => {
	BeersController.find_by(request, response)
})

app.get('/beers/within/:range', (request, response) => {
	BeersController.find_range(request, response)
})

app.get('/beers/:id', (request, response) => {
	BeersController.show(request, response)
})

app.listen(app.get('port'), () => {
	console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app
