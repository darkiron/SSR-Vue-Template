
const express = require('express')
const Vue = require('vue')
const fs = require('fs')

const { createBundleRenderer } = require('vue-server-renderer')

 //const appVue = require('./src/App')
 //const appVue = require('./dist/index.js')

const app = express()

const renderer = createBundleRenderer(
  require('./dist/vue-ssr-server-bundle.json'),
  {
  	runInNewContext: false,
    template: fs.readFileSync('./index.html', 'utf-8')
  }
)


app.get('*', (request, response) => {

	const context = { url: request.url }

	renderer.renderToString(context, (err, html) => {
	    if (err) {
	        if (err.code === 404) {
	          response.status(404).end('Page non trouvée')
	        } else {
	          response.status(500).end('Erreur interne du serveur')
	        }
	    } else {
	        response.end(html)
	    }
  })
})

app.listen(8080)