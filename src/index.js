'use strict'

var Alexa = require('alexa-sdk')

var states = require('./common/states').states
var getLatestEpisode = require('./intentHandlers/getLatestEpisode')
var playLatestEpisode = require('./intentHandlers/playLatestEpisode')
var listPodcasts = require('./intentHandlers/listPodcasts')
var playDirective = require('./common/directives').playDirective

exports.handler = function (event, context, callback) {
  console.log(JSON.stringify(event))

  var dynamoName = process.env.DYNAMO_ARN.split("/")[1]

  var alexa = Alexa.handler(event, context)
  alexa.APP_ID = process.env.APP_ID
  alexa.registerHandlers(commonHandlers, mainHandlers, gotPodcastHandlers)
  alexa.dynamoDBTableName = dynamoName
  alexa.execute()
}

function getLaunchMessage(state) {
  if (state === "") return `Welcome to Guardian Podcasts., I have regular podcasts about football, politics, science and books. You can also listen to in-depth reporting from the Guardian Long Read series. What would you like to hear?`
  else return `Welcome back. Is there a particular podcast you want to play, or would you like a list of podcasts?`
}

var commonHandlers = {
  'LaunchRequest': function() {

    var msg = getLaunchMessage(this.handler.state)
    this.handler.state = states.MAIN
    this.emit(':ask', msg, 'How can I help?')
  },

  'GetPodcast': getLatestEpisode,

  'PlayPodcast': playLatestEpisode,

  'ListPodcasts': listPodcasts,

  // TODO - handle these playback intents
  'AMAZON.StopIntent': function() {
    this.emit(':tell', 'STOPPED')
  },

  'PlaybackStarted': function() {
    this.emit(':responseReady')
  },

  'PlaybackStopped': function() {
    this.emit(':responseReady')
  },

  'PlaybackFinished': function() {
    this.emit(':responseReady')
  },

  'AMAZON.PauseIntent': function() {
    this.emit(':responseReady')
  },

  'AMAZON.ResumeIntent': function() {
    this.emit(':responseReady')
  },

  'Unhandled': function() {
    this.handler.state = states.MAIN
    this.emit(':tell', `Sorry, I'm not sure what you're after.`)
  }
}

var mainHandlers = Alexa.CreateStateHandler(states.MAIN, Object.assign({}, commonHandlers))

// Users enter this state after we've told them about a particular podcast episode
var gotPodcastHandlers = Alexa.CreateStateHandler(states.GOT_PODCAST,
  Object.assign(
    {
      'AMAZON.YesIntent': function() {

        var directive = playDirective(
          this.attributes.episodeUrl,
          this.attributes.episodeTitle,
          0
        )

        this.handler.state = states.MAIN

        this.context.succeed(directive)
      },

      'AMAZON.NoIntent': function() {
        this.emit(':tell', 'OK')
      }
    },
    commonHandlers
  )
)
