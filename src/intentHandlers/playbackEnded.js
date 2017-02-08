var states = require('../common/states').states

/**
 *  Stops the episode and saves offset value
 */
module.exports = function() {
  this.attributes.offset = getOffset(this.event)
  this.handler.state = states.MAIN
  this.emit(':saveState', true)
  this.emit(':responseReady')
}

function getOffset(event) {
  if (event.request.type === 'AudioPlayer.PlaybackFinished') return 0
  else return event.request.offsetInMilliseconds
}
