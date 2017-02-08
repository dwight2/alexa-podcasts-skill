var getEpisode = require('../common/getEpisode').getEpisode
var playDirective = require('../common/directives').playDirective
var states = require('../common/states').states

/**
 * Immediately start playing the latest episode of the requested podcast.
 */
module.exports = function() {
  var that = this
  getEpisode(this.event.request.intent.slots)
    .then((episodeDetails) => {

      this.attributes.episodeUrl = episodeDetails.episodeUrl
      this.attributes.episodeTitle = episodeDetails.episodeTitle
      this.attributes.offset = 0
      this.handler.state = states.MAIN
      this.emit(':saveState', true)

      var directive = playDirective(episodeDetails.episodeUrl, episodeDetails.episodeTitle, 0)
      this.context.succeed(directive)
    })
    .catch(function (message) {
      console.log(`Error getting podcast: "${message}"`)
      that.emit(':tell', message)
    })
}
