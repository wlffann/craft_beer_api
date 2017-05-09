const Beer = require('../models/beer')

function index(request, response) {
	return Beer.all().then((data) => {
		response.status(200).json(data)
	})	
}

function show(request, response) {
	return Beer.find(request.params["id"]).then((data) => {
		response.status(200).json(data)
	})
}

function findBy(request, response) {
	let property = request.params.property.split('=')[0]
	let value = request.params.property.split('=')[1]
	return Beer.findBy(property, value).then((data) => {
		response.status(200).json(data)
	})
}

function findRange(request, response) {
	let property = request.params.range.split('=')[0]
	let range = request.params.range.slice(4).split('-')
	range = range.map((value) => {return parseFloat(value)})
	return Beer.findRange(property, range).then((data) => {
		response.status(200).json(data)
	})
}

module.exports = {
	index: index,
	show: show,
	findBy: findBy,
	findRange: findRange
} 
