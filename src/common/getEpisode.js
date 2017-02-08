var get = require('simple-get-promise').get
var asJson = require('simple-get-promise').asJson

var BASE_URL = 'https://content.guardianapis.com/'

function getPodcastCapiUrl(podcastName) {
  switch (podcastName.toLowerCase()) {
    case 'football':
    case 'football weekly': return 'football/series/footballweekly'

    case 'politics':
    case 'politics weekly': return 'politics/series/politicsweekly'

    case 'science':
    case 'science weekly': return 'science/series/science'

    case 'film':
    case 'film weekly': return 'film/series/the-dailies-podcast'

    case 'in depth':
    case 'the long read':
    case 'long read': return 'news/series/the-audio-long-read'

    case 'books':
    case 'books podcast': return 'books/series/books'

    default: return null
  }
}

function takeUpToHyphen(s) {
  return s.split(/[-–]/)[0].trim()
}

exports.getEpisode = function(slots) {
  return new Promise((resolve, reject) => {
    if (slots && slots.podcast && slots.podcast.value && getPodcastCapiUrl(slots.podcast.value)) {
      var capiQuery = BASE_URL
        + getPodcastCapiUrl(slots.podcast.value)
        + '?tag=type/podcast&type=audio&show-elements=audio'
        + '&api-key=' + process.env.CAPI_KEY
        + '&page-size=1'

      get(capiQuery)
        .then(asJson)
        .then(seriesJson => {
          var item = seriesJson.response.results[0]
          var result = {
            podcastTitle: takeUpToHyphen(seriesJson.response.tag.webTitle),
            episodeUrl: item.elements[0].assets[0].file,
            episodeTitle: takeUpToHyphen(item.webTitle)
          }

          return resolve(result)
        })
        .catch(function (error) {
          console.log(`Error getting podcast from capi: ${error}`)
          return reject(`Sorry, I can't find anything for ${slots.podcast.value}`)
        })
    } else {
      console.log(`Couldn't find podcast in slot: ${JSON.stringify(slots)}`)
      return reject(`Sorry, I can't find anything for that at the moment`)
    }
  })
}
