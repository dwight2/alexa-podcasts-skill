'use strict'

const Alexa = require('alexa-sdk')

const APP_ID = process.env.APP_ID

exports.handler = function (event, context, callback) {
  console.log(JSON.stringify(event))
  var alexa = Alexa.handler(event, context)
  alexa.APP_ID = APP_ID
  alexa.registerHandlers(handlers)
  alexa.execute()
}

var handlers = {
}
