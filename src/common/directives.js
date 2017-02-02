
var cardImages = {
  'smallImageUrl': 'https://s3.amazonaws.com/alexa-config/images/alexa-small.png',
  'largeImageUrl': 'https://s3.amazonaws.com/alexa-config/images/alexa-large.png'
}

exports.playDirective = function(url, title, offset) {
  return {
    'version': '1.0',
    'sessionAttributes': {},
    'response': {
      'card': {
        'type': 'Standard',
        'title': 'Playing Podcast',
        'text': title,
        'image': cardImages
      },
      'reprompt': {
        'outputSpeech': {
          'type': 'PlainText',
          'text': null
        }
      },
      'directives': [
        {
          'type': 'AudioPlayer.Play',
          'playBehavior': 'REPLACE_ALL',
          'audioItem': {
            'stream': {
              'token': JSON.stringify({ url: url, title: title }),
              'url': url,
              'offsetInMilliseconds': offset || 0
            }
          }
        }
      ],
      'shouldEndSession': true
    }
  }
}
