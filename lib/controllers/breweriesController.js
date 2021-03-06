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

function findBy(request, response) {
  let property = request.params.property.split('=')[0]
  let value = request.params.property.split('=')[1]
  return Brewery.findBy(property, value).then((data) => {
    response.status(200).json(data)
  })
}

function beers(request, response) {
  return Brewery.beers(request.params.id).then((data) => {
    response.status(200).json(data)
  })
}

module.exports = {
  index: index,
  show: show,
  beers: beers,
  findBy: findBy
}