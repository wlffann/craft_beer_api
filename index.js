const express = require('express'),
	apiV1Router = express.Router(),
	app = express();
const md = require('github-flavored-markdown').parse
const fs = require('fs')
const BeersController = require('./lib/controllers/beersController')
const BreweriesController = require('./lib/controllers/breweriesController')

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Craft Beer API'

app.engine('md', function(path, options, fn){
  fs.readFile(path, 'utf8', function(err, str){
    if (err) return fn(err);
    try {
      var html = md(str);
      html = html.replace(/\{([^}]+)\}/g, function(_, name){
        return options[name] || '';
      })
      fn(null, html);
    } catch(err) {
      fn(err);
    }
  });
})

app.set('views', __dirname);

app.set('view engine', 'md');

app.get('/', (request, response) => {
	response.render('README', {title: 'Craft Beer API'})
})

apiV1Router.get('/beers', (request, response) => {
	BeersController.index(request, response)
})

apiV1Router.get('/beers/by/:property', (request, response) => {
	BeersController.findBy(request, response)
})

apiV1Router.get('/beers/within/:range', (request, response) => {
	BeersController.findRange(request, response)
})

apiV1Router.get('/beers/:id', (request, response) => {
	BeersController.show(request, response)
})

apiV1Router.get('/breweries', (request, response) => {
	BreweriesController.index(request, response)
})

apiV1Router.get('/breweries/:id/beers', (request, response) => {
	BreweriesController.beers(request, response)
})

apiV1Router.get('/breweries/by/:property', (request, response) => {
	BreweriesController.findBy(request, response)
})

apiV1Router.get('/breweries/:id', (request, response) => {
	BreweriesController.show(request, response)
})

app.use('/api/v1', apiV1Router)

app.listen(app.get('port'), () => {
	console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app
