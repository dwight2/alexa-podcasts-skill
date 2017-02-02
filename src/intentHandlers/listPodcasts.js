var cardImages = require('../common/imageUrls').cardImages

var podcastsCard = `You can listen to the following podcasts:
____________________
Lifestyle & Culture
Books podcast, Close Encounters, Film Weekly, Music Weekly, The Citadel
____________________
News & opinion
Behind the lines, Politics for humans, Politics Weekly, What would a feminist do?
____________________
Science & technology
Brain waves, Chips with everything, Science Weekly
____________________
Sport
Football Weekly, Premier League: the view from Australia
____________________
Storytelling
The Long Read, The Story
`

module.exports = function() {
  this.emit(
    ':askWithCard',
    `I have regular podcasts about football, politics, science and books. You can also listen to in-depth reporting from the Guardian Long Read series. I have sent a full list to your Alexa app. What would you like to hear?`,
    'How can I help?',
    'Podcasts',
    podcastsCard,
    cardImages
  )
}
