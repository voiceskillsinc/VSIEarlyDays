'use strict';

const Alexa = require('ask-sdk-core');
const cookbook = require('alexa-cookbook.js');
var strip = require('./strip.js');

////////////////////////////////////////////////////////

const SKILL_NAME = 'Remember When 1950';
const HELP_MESSAGE = 'You can say tell me a fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const FALLBACK_MESSAGE = 'The Remember When skill can\'t help you with that. It can help you discover facts about the year this skill is named after if you say tell me a fact. What can I help you with?';
const FALLBACK_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Thanks for using this Skill always Remember When!';
const SMALLIMAGE = 'https://s3.amazonaws.com/bigsixwheel/cardS.png';
const LARGEIMAGE = 'https://s3.amazonaws.com/bigsixwheel/cardL.png';
const BREAK = '<break time="1s"/>';

/////////////////////////////////////
const rememberWhenFacts = [
  //POPULATION//
'Estimated United States Population 198,712,056 millon',
'United States Life expectancy 70.5 years',
 //Economics//
'Federal spending for the United States: $157 billion',
'Federal debt for the United States: $340 billion',
'Consumer Price Index: $33.4',
'Unemployment Rate for the United States: 3.8%',
'Cost of a first-class United States stamp: $0.05',
 //Events//
'Racial violence in Detroit; 7,000 National Guardsmen aid police after night of rioting. Similar outbreaks in New York City\'s Spanish Harlem, Rochester, N.Y., Birmingham, Ala., and New Britain, Conn. (July 23).',
'Thurgood Marshall sworn in as first black US Supreme Court justice (Oct. 2).',
'Astronauts Col. Virgil I. Grissom, Col. Edward White II, and Lt. Cmdr. Roger B. Chaffee killed in fire during test launch (Jan. 27).',
'Biafra secedes from Nigeria (May).',
'Israeli and Arab forces battle; Six-Day War ends with Israel occupying Sinai Peninsula, Golan Heights, Gaza Strip and West Bank (June 5).',
'Right-wing military coup deposes King Constantine IIof Greece.',
'Communist China announces explosion of its first hydrogen bomb (June 17).',
'The US and USSR propose a nuclear nonproliferation treaty.',
 //Sports//
'Super Bowl, Green Bay d. Kansas City',
'World Series, St. Louis Cardinals d. Boston Red Sox',
'NBA Championship, Philadelphia 76ers d. SF Warriors',
'Stanley Cup Champions, Toronto d. Montreal',
'Wimbledon Champion Women, Billie Jean King d. A. Jones',
'Wimbledon Champion Men, John Newcombe d. W. Bungert',
'Kentucky Derby Champion, Proud Clarion',
'N C A A Basketball Champions, UCLA d. Dayton',
'N C A A Football Champions, USC',
'Worold Cup, Not Held',
 //Enterainment//
'Congress creates PBS.',
'Rolling Stone and New York Magazine debut, spawning the popularity of special-interest and regional magazines.',
 //Science//
'Antony Hewish and Jocelyn Bell Burnel (UK) discover pulsars.',
'Jerome Friedman, Henry Kendall, Richard Taylor (US) discover protons and neutrons to be composed of even smaller particles called quarks.',
'The MIRV (Multiple Indepenently Targetable Reetry Vehicle), which allows one missile to carry several nuclear warheads, is developed. Background: nuclear weapons',
'Dr. Christiaan N. Barnard and team of South African surgeons perform world\'s first successful human heart transplant (Dec. 3). The patient dies 18 days later.',
 //Deaths//
'Famous Deaths, Ernesto "Che" Guevara, Spencer Tracy, Woody Guthrie, Langston Hughes, Alice B. Toklas, John Coltrane'
];

////////////////////////////////////

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    // checks request type
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const cardTitle = SKILL_NAME;
    const cardText =  SKILL_NAME + BREAK + '\n' + cookbook.getRandomItem(rememberWhenFacts) + '\n Please be sure to leave us a review.';
    const speechOutput = cardText;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withStandardCard(cardTitle, strip.stripTags(cardText), SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
      || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent');
  },
  handle(handlerInput) {
    const cardTitle = SKILL_NAME;
    const speechOutput = HELP_MESSAGE;
    const reprompt = HELP_REPROMPT;
    const cardText = HELP_MESSAGE;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(reprompt)
      .withStandardCard(cardTitle, cardText, SMALLIMAGE, LARGEIMAGE)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
   const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const cardTitle = SKILL_NAME;
    const speechOutput = STOP_MESSAGE;
    const stopmessage = STOP_MESSAGE + '\n Please be sure to leave us a review.';

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withStandardCard(cardTitle, stopmessage, SMALLIMAGE, LARGEIMAGE)
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

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Error didn\'t work!')
      .withStandardCard(SKILL_NAME, `Error handled: ${error.message}`)
      .reprompt('Error didn\'t work!')
      .getResponse();
  },
};

/////////////////////////////////////

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )

  .addErrorHandlers(ErrorHandler)
  .withApiClient(new Alexa.DefaultApiClient())
  .lambda();

/////////////////////////////////////
