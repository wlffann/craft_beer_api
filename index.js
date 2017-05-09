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
	BeersController.findBy(request, response)
})

app.get('/beers/within/:range', (request, response) => {
	BeersController.findRange(request, response)
})

app.get('/beers/:id', (request, response) => {
	BeersController.show(request, response)
})

app.get('/breweries', (request, response) => {
	BreweriesController.index(request, response)
})

app.get('/breweries/:id', (request, response) => {
	BreweriesController.show(request, response)
})

app.get('/breweries/by/:property', (request, response) => {
	BreweriesController.findBy(request, response)
})

app.listen(app.get('port'), () => {
	console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app
