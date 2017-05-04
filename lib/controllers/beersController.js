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

module.exports = {
	index: index,
	show: show
} 
