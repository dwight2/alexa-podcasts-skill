var get = require('simple-get-promise').get
var asJson = require('simple-get-promise').asJson

var BASE_URL = 'https://content.guardianapis.com/'

function getPodcastCapiUrl(podcastName) {
  switch (podcastName.toLowerCase()) {
    case 'football':
    case 'football weekly': return {
      url: 'football/series/footballweekly',
      title: 'Football Weekly'
    }

    case 'politics':
    case 'politics weekly': return {
      url: 'politics/series/politicsweekly',
      title: 'Politics Weekly'
    }

    case 'science':
    case 'science weekly': return {
      url: 'science/series/science',
      title: 'Science Weekly'
    }

    case 'film':
    case 'film weekly': return {
      url: 'film/series/the-dailies-podcast',
      title: 'Film Weekly'
    }

    case 'in depth':
    case 'the long read':
    case 'long read': return {
      url: 'news/series/the-audio-long-read',
      title: 'The Long Read'
    }

    case 'books':
    case 'books podcast': return {
      url: 'books/series/books',
      title: 'The Books Podcast'
    }

    case 'chips with everything': return {
      url: 'technology/series/chips-with-everything',
      title: 'Chips with everything'
    }

    case 'feminism':
    case 'what would a feminist do': return {
      url: 'commentisfree/series/what-would-a-feminist-do',
      title: 'What would a feminist do'
    }

    case 'game of thrones':
    case 'the citadel': return {
      url: 'tv-and-radio/series/game-of-thrones-the-citadel-podcast',
      title: 'The Citadel'
    }

    default: return null
  }
}

function takeUpToHyphen(s) {
  return s.split(/[-–]/)[0].trim()
}

exports.getEpisode = function(slots) {
  return new Promise((resolve, reject) => {
    if (slots && slots.podcast && slots.podcast.value && getPodcastCapiUrl(slots.podcast.value)) {
      var podcastDetails = getPodcastCapiUrl(slots.podcast.value)
      var capiQuery = BASE_URL
        + podcastDetails.url
        + '?tag=type/podcast&type=audio&show-elements=audio'
        + '&api-key=' + process.env.CAPI_KEY
        + '&page-size=1'

      get(capiQuery)
        .then(asJson)
        .then(seriesJson => {
          var item = seriesJson.response.results[0]
          var result = {
            podcastTitle: podcastDetails.title,
            episodeUrl: item.elements[0].assets[0].file + '?platform=amazon-echo&skill=podcasts',
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
