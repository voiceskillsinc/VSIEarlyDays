const Alexa = require('ask-sdk');

const STREAMS = [
  {
    "url": 'https://s3.amazonaws.com/dearsanta/NightBeforeAudio.mp3',
    "token": "1111",
    "expectedPreviousToken": "1111",
    "offsetInMilliseconds": 0,
    "metadata" : {
      "title": "A Visit from St. Nicholas",
      "subtitle":"By Clement Clarke Moore",
      "art": {
        "sources": [
          {
            "contentDescription": "santaLogoCardL",
            "url": "https://s3.amazonaws.com/dearsanta/santaLogoCardL.png",
            "widthPixels": 512,
            "heightPixels": 512
          }
        ]
      },
      "backgroundImage": {
        "sources": [
          {
            "contentDescription": "santaList",
            "url": "https://s3.amazonaws.com/dearsanta/santaList.png",
            "widthPixels": 1200,
            "heightPixels": 800
          }
        ]
      }
    }
  }
];

const PlayStreamIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest' ||
        handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && (handlerInput.requestEnvelope.request.intent.name === 'PlayStreamIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ResumeIntent');
  },
  handle(handlerInput) {

if (supportsDisplay(handlerInput)){
  let stream = STREAMS[0];

  const attributesManager = handlerInput.attributesManager;
  const attributes = attributesManager.getPersistentAttributes();

  attributesManager.setPersistentAttributes(attributes);
  attributes['stream'] = true;

    handlerInput.responseBuilder
      .speak(`starting ${stream.metadata.title}`)
      .addAudioPlayerPlayDirective('REPLACE_ALL', stream.url, stream.token, stream.expectedPreviousToken, null, stream.metadata);

    return handlerInput.responseBuilder
      .getResponse();
 } else {
    const cardTitle = 'A Visit from St. Nicholas';
    const cardText = 'Thanks for using our Skill please be sure to try Dear Santa!';
    const SMALLIMAGE = 'https://s3.amazonaws.com/dearsanta/santaLogoCardS.png';
    const LARGEIMAGE = 'https://s3.amazonaws.com/dearsanta/santaLogoCardL.png';

    return handlerInput.responseBuilder
      .speak(`starting The Night Before Christmas` + "<audio src='https://s3.amazonaws.com/dearsanta/NightBeforeAudio.mp3' />",)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
    }
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
       || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent'
       || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.MoreIntent');
  },
  handle(handlerInput) {
    const speechText = 'This skill only plays A Visit from St. Nicholas also known as the night before Christmas.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent');
  },
  handle(handlerInput) {

    handlerInput.responseBuilder
      .addAudioPlayerClearQueueDirective('CLEAR_ALL')
      .addAudioPlayerStopDirective();

    return handlerInput.responseBuilder
      .getResponse();
  },
};

const loopOnIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.LoopOnIntent';
  },
handle(handlerInput) {

  const attributesManager = handlerInput.attributesManager;
  const responseBuilder = handlerInput.responseBuilder;

  const attributes = attributesManager.getPersistentAttributes();

    attributesManager.setPersistentAttributes(attributes);
    attributes['stream'] = true;
    speechText = `Loop turned on`;

    return responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const loopOffIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.LoopOffIntent';
  },
handle(handlerInput) {
  const attributesManager = handlerInput.attributesManager;
  const responseBuilder = handlerInput.responseBuilder;

  const attributes = attributesManager.getPersistentAttributes();

    attributesManager.setPersistentAttributes(attributes);
    attributes['stream'] = false;
    speechText = `Loop turned off`;

    return responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const PlaybackStartedIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStarted';
  },
  handle(handlerInput) {
    handlerInput.responseBuilder
      .addAudioPlayerClearQueueDirective('CLEAR_ENQUEUED');

    return handlerInput.responseBuilder
      .getResponse();
  },
};

const PlaybackStoppedIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStopped';
  },
  handle(handlerInput) {
    //should save details so play can be resumed.
    return true;
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder
      .getResponse();
  },
};

const ExceptionEncounteredRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'System.ExceptionEncountered';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return true;
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .addAudioPlayerClearQueueDirective('CLEAR_ALL')
      .addAudioPlayerStopDirective()
      .getResponse();
  },
};

///////////////////ALEXASHOW///////////////
function supportsDisplay(handlerInput) {
  const hasDisplay =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;
  return hasDisplay;
}
//////////////////////////////////////////////

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    PlayStreamIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    loopOnIntentHandler,
    loopOffIntentHandler,
    PlaybackStartedIntentHandler,
    PlaybackStoppedIntentHandler,
    ExceptionEncounteredRequestHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withTableName('sounds')
  .withAutoCreateTable(true)
  .lambda();
