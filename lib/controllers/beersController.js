const Beer = require('../models/beer')

function index(request, response) {
	return Beer.all().then((data) => {
		response.status(200).json({"beers": data})
	})	
}

module.exports = {
	index: index
} 
