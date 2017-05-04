const Beer = require('../models/beer')

function index(request, response) {
	return Beer.all().then((data) => {
		response.status(200).json({"beers": data})
	})	
}

function show(request, response) {
	return Beer.find(request.params["id"]).then((data) => {
		response.status(200).json(data)
	})
}

function find_by(request, response) {
	let property = request.params.property.split('=')[0]
	let value = request.params.property.split('=')[1]
	return Beer.find_by(property, value).then((data) => {
		response.status(200).json(data)
	})
}

module.exports = {
	index: index,
	show: show,
	find_by: find_by
} 
