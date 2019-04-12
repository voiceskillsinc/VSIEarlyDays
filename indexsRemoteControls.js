// alexa, open my sample audio skill

const Alexa = require('ask-sdk-core');

const SKILL_NAME = 'My Sample Audio Player';
const audioURL = 'https://listen.radionomy.com/1000hitsclassicalmusic.m3u';


const TEMPLATE_BACKGROUND         = "https://tc-cors-testing-bucket.s3.amazonaws.com/ask_hero-banner.png";
const TEMPLATE_ARTWORK            = "https://i1.sndcdn.com/avatars-000236176779-ubsbvi-original.jpg";
const AUDIO_METADATA = {
  title: "This is my audio",
  subtitle: "my station",
  art: {
    sources: [{
        url: TEMPLATE_ARTWORK
    }]
  },
  backgroundImage: {
    sources: [{
      url: TEMPLATE_BACKGROUND
    }] 
  }
};

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  
  handle(handlerInput) {
    const speechText = 'Welcome to the Alexa Skills Kit, you can say play audio!';
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse();
  }
};

const PlayAudioIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'PlayAudioIntent';
  },
  
  // SYNTAX
  // addAudioPlayerPlayDirective(playBehavior: interfaces.audioplayer.PlayBehavior, url: string, token: string, offsetInMilliseconds: number, expectedPreviousToken?: string, audioItemMetadata? : AudioItemMetadata): this;
  
  handle(handlerInput) {
    const speechText = 'You are now listening to an audio stream.';
    return handlerInput.responseBuilder
      .speak(speechText)
      .addAudioPlayerPlayDirective('REPLACE_ALL', audioURL, 'my_token', null, null, AUDIO_METADATA)
      .withSimpleCard("Audio Stream Title", "You are now listening to an audio stream.")
      .getResponse();
  }
};

const AudioPlayerFailedHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackFailed';
  },
  handle(handlerInput) {
    console.log("### ### AudioPlayerFailedHandler.");
    console.log("### ### Error Message: " + handlerInput.requestEnvelope.request.error.message);
    console.log("### ### Error Type   : " + handlerInput.requestEnvelope.request.error.type);

    return handlerInput.responseBuilder
      .addAudioPlayerStopDirective()
      .getResponse();
  }
};

const AmazonPauseIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent';
  },
  handle(handlerInput) {
    const speechText = 'Stopping audio stream.';
    return handlerInput.responseBuilder
      .speak(speechText)
      .addAudioPlayerStopDirective()
      .getResponse();
  }
};

const AmazonResumeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ResumeIntent';
  },
  handle(handlerInput) {
    const speechText = 'Resuming audio stream.';
    return handlerInput.responseBuilder
      .speak(speechText)
      // This is a live stream, setting null for offsetInMilliseconds.
      .addAudioPlayerPlayDirective('REPLACE_ALL', audioURL, 'my_token', null, null, AUDIO_METADATA)
      .getResponse();
  }
};

const AmazonNextIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NextIntent';
  },
  handle(handlerInput) {
    const speechText = 'This is an unsupported request.';
    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  }
};

const AmazonPreviousIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PreviousIntent';
  },
  handle(handlerInput) {
    const speechText = 'This is an unsupported request.';
    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  }
};

const PlaybackControllerPlayHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'PlaybackController.PlayCommandIssued';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .addAudioPlayerPlayDirective('REPLACE_ALL', audioURL, 'my_token', null, null, AUDIO_METADATA)
      .getResponse();
  }
};

const PlaybackControllerNavigateHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'PlaybackController.PreviousCommandIssued'
        || handlerInput.requestEnvelope.request.type === 'PlaybackController.NextCommandIssued';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .addAudioPlayerPlayDirective('REPLACE_ALL', audioURL, 'my_token', null)
      .getResponse();
  }
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('Goodbye!')
      .getResponse();
  },
};

const UnhandledIntent = {
  canHandle() {
    return true;
  },
  handle(handlerInput) {
    const outputSpeech = 'I did not get that. You can say play audio to listen to the stream.';
    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .reprompt(outputSpeech)
      .getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const FallbackHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.FallbackIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    PlayAudioIntentHandler,
    AmazonPauseIntentHandler,
    AmazonResumeIntentHandler,
    AmazonPreviousIntentHandler,
    AmazonNextIntentHandler,
    PlaybackControllerPlayHandler,
    PlaybackControllerNavigateHandler,
    AudioPlayerFailedHandler,
    ExitHandler,
    SessionEndedRequestHandler,
    FallbackHandler,
    UnhandledIntent,
  )
  .addRequestInterceptors({
    process(handlerInput) {
      console.log('++++ REQUEST', JSON.stringify(handlerInput.requestEnvelope, null, 2));
    },
  })
  .addResponseInterceptors({
    process(handlerInput, response) {
      console.log('++++ RESPONSE', JSON.stringify(response, null, 2));
    },
  })
  .addErrorHandlers(ErrorHandler)
  .lambda();
