
module.exports = function() {
  //TODO - send card
  this.emit(
    ':ask',
    `I have regular podcasts about football, politics, science and books. You can also listen to in-depth reporting from the Guardian Long Read series. I have sent a full list to your Alexa app. What would you like to hear?`,
    'How can I help?'
  )
}
