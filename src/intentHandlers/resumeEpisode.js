var playDirective = require('../common/directives').playDirective
var states = require('../common/states').states

/**
 * Resume the last requested podcast
 */
module.exports = function() {
  if (this.attributes.episodeUrl && this.attributes.episodeTitle) {
    var offset = this.attributes.offset || 0
    var directive = playDirective(this.attributes.episodeUrl, this.attributes.episodeTitle, offset)
    this.handler.state = states.MAIN
    this.emit(':saveState', true)
    this.context.succeed(directive)
  } else {
    this.emit(':ask', `Tell me the name of the podcast you want to play, or ask for a list of available podcasts.`, ``)
  }
}
