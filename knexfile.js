// Update with your config settings.

module.exports = {

	development: {
		client: 'pg',
		connection:'postgres://localhost/beers',
		migrations: {
			directory: './db/migrations'
		},
		seeds: {
			directory: './db/seeds/dev'
		},
		usenullasdefault: true
	},

	test: {
		client: 'pg',
		connection:'postgres://localhost/beers_test',
		migrations: {
			directory: './db/migrations'
		},
		seeds: {
			directory: './db/seeds/test'
		},
		usenullasdefault: true
	},

	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: './db/migrations'
		},
		seeds: {
			directory: './db/seeds/production'
		},
		useNullAsDefault: true
	}
}
