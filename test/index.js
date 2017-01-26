var tap = require('tap')

var getEpisode = require('../src/common/getEpisode').getEpisode

tap.test('Test get podcast', t => {
  var slots = {
    podcast: {
      value: "football weekly"
    }
  }

  return getEpisode(slots).then(function(result) {
    t.equal(result.podcastTitle, 'Football Weekly')
    t.equal(result.episodeTitle && result.episodeTitle !== "", true)
    t.equal(result.episodeUrl && result.episodeUrl !== "", true)
  })
})
