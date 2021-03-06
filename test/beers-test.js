const assert = require('chai').assert
const app = require('../index')
const request = require('request')
const Beer = require('../lib/models/beer')

describe('Beers', () => {
	before(done => {
		this.port = 9876
		this.server = app.listen(this.port, (err, result) => {
			if (err) { return done(err) }
			done()
		})
		this.request = request.defaults({
			baseUrl: 'http://localhost:9876/api/v1'
		})
	})

	after(() => {
		this.server.close()
	})

	beforeEach((done) => {
		Promise.all(
			[
				Beer.create(1, 60, 0.05, 'Pub Beer', 'American Pale Lager', 408, 12),
				Beer.create(2, 48, 0.066, 'Devils Cup', 'American Pale Ale (APA)', 177, 12),
				Beer.create(3, 90, 0.071, 'Rise of the Phoenix', 'American IPA', 177, 12)
			]
		).then(() => done())
	})

	afterEach((done) => {
		Beer.clearAll().then(() => done())
	})

	describe('GET /beers', () => {
		it('should recieve a 200', (done) => {
			this.request.get('/beers', (error, response) => {
				if(error) { done(error) }
				assert.equal(response.statusCode, 200)
				done()
			}) 
		})
    
    it('should return all beers', (done) => {
			this.request.get('/beers', (error, response) => {
        if(error) { done(error) }
				let beers = JSON.parse(response.body)
        assert.equal(beers.length, 3)
				done()
      })
    })
  })

	describe('GET /beers/:id', () => {
		it('should recieve a 200', (done) => {
			this.request.get('/beers/1', (error, response) => {
				if(error) { done(error) }
				assert.equal(response.statusCode, 200)
				done()
			})
		})

		it('should return the matching record', (done) => {
			this.request.get('/beers/1', (error, response) => {
				if(error) { done(error) }
				let beer = JSON.parse(response.body)
				assert.equal(beer["id"], 1)
				assert.equal(beer["name"], "Pub Beer")
				done()
			})
		})
	})

	describe('GET /beers/by/:property', () => {
		it('should return a 200', (done) => {
			this.request.get('/beers/by/style=IPA', (error, response) => {
				if(error) {done(error)}
				assert.equal(response.statusCode, 200)
				done()
			})
		})
		
		it('should return all matching records by style', (done) => {
			this.request.get('/beers/by/style=IPA', (error, response) => {
				if(error) {done(error)}
				let beers = JSON.parse(response.body)
				assert.equal(beers.length, 1)
				assert.equal(beers[0].name, 'Rise of the Phoenix')
				done()
			})
		})

		it('should return all matching records by name', (done) => {
			this.request.get('/beers/by/name=Devils%20Cup', (error, response) => {
				if(error) {done(error)}
				let beers = JSON.parse(response.body)
				assert.equal(beers.length, 1)
				assert.equal(beers[0].name, "Devils Cup")
				done()
			})
		})
	})

	describe('GET /beers/abv/:range', () => {
		it('should return a 200', (done) => {
			this.request.get('/beers/within/abv=0.05-0.07', (error, response) => {
				if(error) {done(error)}
				assert.equal(response.statusCode, 200)
				done()
			})
		})

		it('should return all records within range for abv', (done) => {
			this.request.get('/beers/within/abv=0.05-0.07', (error, response) => {
				if(error) {done(error)}
				let beers = JSON.parse(response.body)
				assert.equal(beers.length, 2)
				assert.equal(beers[0].name, "Pub Beer")
				done()
			})
		})

		it('should return all records with a range for ibu', (done) => {
			this.request.get('/beers/within/ibu=48-65', (error, response) => {
				if(error) {done(error)}
				let beers = JSON.parse(response.body)
				assert.equal(beers.length, 2)
				assert.equal(beers[0].name, "Devils Cup")
				done()
			})
		})
	})
})
