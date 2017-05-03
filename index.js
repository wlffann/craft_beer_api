const express = require('express')
const app = express()

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Craft Beer API'

app.get('/', (request, response) => {
  response.send(`Welcome to the ${app.locals.title}`)
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app;
