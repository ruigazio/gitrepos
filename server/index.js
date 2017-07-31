const fs = require('fs')
const https = require('https')
const querystring = require('querystring')
const express = require('express')
const repos = require('./repos')

const app = express()

app.param('username', function (req, res, next, username) {
  req.username = username
  next()
})

app.get('/githubUserRepos/:username', function (req, res) {

  /* 
   * relay error to the browser
   * invoked when call to github encounters a problem
   * either github is down or internal network issues
   * should be treated differently...                 
  */ 
  function errorHandler(e) {
    res.json(e)
    res.status(e.statusCode).send()
    console.log( 'error handler')
  }

  const options = repos.getOptions(req.username)
  // invoke the call to github with the username received by the client
  makeRequestP( options )
    .then( relayToClient.bind( this, res, repos.success, repos.failure) ) 
    .catch( errorHandler )
})


function relayToClient(clientResponse, success, failure, {response, body}) {
  const statusCode = response.statusCode
  const handler = statusCode === 200 ? success : failure
  const client = handler( response, body )
  clientResponse
    .set('Access-Control-Allow-Origin', '*')
    .status(client.status)
    .json( client.body )
}

function makeRequestP (options) {
  return new Promise( function (resolve, reject) {
    // response buffer
    let body = ''

    // set request handlers
    const req = https.request(options, (response) => {
      // push each chunk of the response in the buffer
      response.on('data', d => body += d)

      // when response is fully received
      response.on('end', (d) => resolve({response, body}) )
    })

    req.on('error', (e) => {
      console.error('network error', e)
      reject(e)
    })

    // initiate the request
    req.end()
  })
}

// initiate express
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
