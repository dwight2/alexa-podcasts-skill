var getEpisode = require('../common/getEpisode').getEpisode
var states = require('../common/states').states

/**
 * Retrieve the details of the latest episode of the requested podcast, and ask the user if they'd like to hear it.
 */
module.exports = function() {
  var that = this
  getEpisode(this.event.request.intent.slots)
    .then((episodeDetails) => {

      this.attributes.episodeUrl = episodeDetails.episodeUrl
      this.attributes.episodeTitle = episodeDetails.episodeTitle
      this.handler.state = states.GOT_PODCAST
      this.emit(':saveState', true)

      this.emit(
        ':ask',
        `Sure, the latest ${episodeDetails.podcastTitle} was ${episodeDetails.episodeTitle}; would you like me to play this now?`,
        'How can I help?'
      )
    })
    .catch(function (message) {
      console.log(`Error getting podcast: ${message}`)
      that.emit(':tell', message)
    })
}
