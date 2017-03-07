var cardImages = require('../common/imageUrls').cardImages

var podcastsCard = `You can listen to the following podcasts:
* Football Weekly - James Richardson and the pod squad bring you puns and punditry from the world of Football.
* Film Weekly - our round-up of the week's big and small releases.
* Politics Weekly - UK and international politics.
* Books Podcast - our weekly look at the world of books, poetry and great writing.
* Science Weekly - the best place to learn about the big discoveries and debates in biology, chemisty, physics and sometimes even maths.
* The Long Read - in-depth reporting, essays and profiles.
* What would a feminist do? - Jessica Valenti brings you interviews, advice and real life stories from the front lines of feminism.
* Chips with everything - our digital culture podcast.
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
