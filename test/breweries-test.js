const assert = require('chai').assert
const app = require('../index')
const request = require('request')
const Brewery = require('../lib/models/brewery')

describe('Breweries', () => {
  before(done => {
		this.port = 9876
		this.server = app.listen(this.port, (err, result) => {
			if (err) { return done(err) }
			done()
		})
		this.request = request.defaults({
			baseUrl: 'http://localhost:9876/'
		})
	})

	after(() => {
		this.server.close()
	})

  beforeEach((done) => {
		Promise.all(
			[
				Brewery.create(0, 'NorthGate Brewing', 'Minneapolis', 'MN'),
				Brewery.create(1, 'Against the Grain Brewery', 'Louisville', 'KY'),
				Brewery.create(2, "Jack's Abby Craft Lagers", 'Framingham', 'MA')
			]
		).then(() => done())
	})

	afterEach((done) => {
		Brewery.clearAll().then(() => done())
	})

  describe('GET /breweries', () => {
    it('should recieve a 200', (done) => {
			this.request.get('/breweries', (error, response) => {
				if(error) { done(error) }
				assert.equal(response.statusCode, 200)
				done()
			}) 
		})

    it('should return all matching records', (done) => {
      this.request.get('/breweries', (error, response) => {
        if(error) { done(error) }
        let breweries = JSON.parse(response.body)
        assert.equal(breweries.length, 3)
        done()
      })
    })
  })

  describe('GET /breweries/:id', () => {
    it('should recieve a 200', (done) => {
			this.request.get('/breweries/0', (error, response) => {
				if(error) { done(error) }
				assert.equal(response.statusCode, 200)
				done()
			}) 
		})
    
    it('should return the matching record by id', (done) => {
      this.request.get('/breweries/1', (error, response) => {
				if(error) { done(error) }
        let brewery = JSON.parse(response.body)
				assert.equal(brewery.name, 'Against the Grain Brewery')
        assert.equal(brewery.city, 'Louisville')
        assert.equal(brewery.state, 'KY')
				done()
			})
    })
  })

  describe('GET /breweries/by/:property', () => {
    it('should return a 200', (done) => {
      this.request.get('/breweries/by/name=NorthGate%20Brewing', (error, response) => {
				if(error) { done(error) }
				assert.equal(response.statusCode, 200)
				done()
			})     
    })

    it('should return matching records by name', (done) => {
      this.request.get('/breweries/by/name=NorthGate', (error, response) => {
				if(error) { done(error) }
        let breweries = JSON.parse(response.body)
        assert.equal(breweries.length, 1)
        assert.equal(breweries[0].name, 'NorthGate Brewing')
        done()
      })
    })

    it('should return matching records by state', (done) => {
      this.request.get('/breweries/by/state=MN', (error, response) => {
				if(error) { done(error) }
        let breweries = JSON.parse(response.body)
        assert.equal(breweries.length, 1)
        assert.equal(breweries[0].name, 'NorthGate Brewing')
        done()
      })
    })

    it('should return matching records by city', (done) => {
      this.request.get('/breweries/by/city=Minneapolis', (error, response) => {
				if(error) { done(error) }
        let breweries = JSON.parse(response.body)
        assert.equal(breweries.length, 1)
        assert.equal(breweries[0].name, 'NorthGate Brewing')
        done()
      })
    })
  })
})