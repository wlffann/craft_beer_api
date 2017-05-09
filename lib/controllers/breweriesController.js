const Brewery = require('../models/brewery')

function index(request, response) {
  return Brewery.all().then((data) => {
    response.status(200).json(data)
  })
}

function show(request, response) {
  return Brewery.find(request.params.id).then((data) => {
    response.status(200).json(data)
  })
}

module.exports = {
  index: index,
  show: show
}