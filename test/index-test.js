const assert = require('chai').assert
const app = require('../index')
const request = require('request')

describe('Server', () => {
	it('should exsist', () => {
		assert(app)
	})
  
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
 
	describe('GET /', () => {
		it('should recieve a 200', (done) => {
			this.request.get('/', (error, response) => {
				if(error) { done(error) }
				assert.equal(response.statusCode, 200)
				done()
			}) 
		})

		it('should return the correct message', (done) => {
			this.request.get('/', (error, response) => {
				if(error) { done(error) }
				assert.equal(response.body, 'Welcome to the Craft Beer API')
				done()
			})
		})
	})

})
