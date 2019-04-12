'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = 'amzn1.ask.skill.87de67c5-87c0-4a93-93d1-a73e68126cc5';

var SKILL_NAME = "Big Six Wheel";
var WELCOME_MESSAGE = "Welcome to the Big Six Wheel";
var HELP_MESSAGE = "Just use the wake word Big Six Wheel to launch the Skill.";
var HELP_REPROMPT = "Just use the wake word Big Six Wheel to launch the Skill.";
var STOP_MESSAGE = "Goodbye and thanks for playing!";

var randomNumbers = [
  "1, 1, 1",
  "2, 2, 3",
  "5, 6, 6",
  "1, 2, 2",
  "5, 5, 5",
  "2, 4, 6",
  "3, 6, 6",
  "1, 1, 4",
  "1, 2, 5",
  "3, 5, 5",
  "2, 6, 6",
  "1, 1, 3",
  "2, 5, 6",
  "1, 3, 3",
  "4, 4, 4",
  "1, 3, 5",
  "3, 4, 4",
  "2, 2, 6",
  "2, 5, 5",
  "2, 4, 5",
  "1, 6, 6",
  "1, 1, 6",
  "2, 2, 2",
  "1, 3, 4",
  "2, 3, 3",
  "4, 4, 5",
  "3, 4, 6",
  "2, 2, 5",
  "1, 5, 5",
  "1, 2, 4",
  "6, 6, 6",
  "1, 1, 2",
  "1, 4, 4",
  "3, 3, 5",
  "1, 3, 6",
  "2, 2, 4",
  "5, 5, 6",
  "3, 3, 3",
  "4, 6, 6",
  "1, 1, 5",
  "1, 4, 5",
  "4, 4, 6",
  "3, 3, 4",
  "2, 3, 6",
  "4, 5, 5",
  "2, 4, 4",
  "3, 3, 6",
  "3, 5, 6"
];

var bigWheel = [
  "No more bets," + "<audio src='https://s3.amazonaws.com/bigsixwheel/prizeWheel5.mp3' />",
  "No more bets," + "<audio src='https://s3.amazonaws.com/bigsixwheel/prizeWheel6.mp3' />",
  "No more bets," + "<audio src='https://s3.amazonaws.com/bigsixwheel/prizeWheel7.mp3' />",
  "No more bets," + "<audio src='https://s3.amazonaws.com/bigsixwheel/prizeWheel8.mp3' />",
  "No more bets," + "<audio src='https://s3.amazonaws.com/bigsixwheel/prizeWheel9.mp3' />",
  "No more bets," + "<audio src='https://s3.amazonaws.com/bigsixwheel/prizeWheel10.mp3' />",
  "No more bets," + "<audio src='https://s3.amazonaws.com/bigsixwheel/prizeWheel11.mp3' />",
  "No more bets," + "<audio src='https://s3.amazonaws.com/bigsixwheel/prizeWheel66.mp3' />"
];


var handlers = {
    'LaunchRequest': function () {
      var numbersArr = randomNumbers;
      var numbersIndex = Math.floor(Math.random() * numbersArr.length);
      var randomNum = numbersArr[numbersIndex];
      var cardTitle = randomNum;
      var bigWheelArr = bigWheel;
      var bigWheelIndex = Math.floor(Math.random() * bigWheelArr.length);
      var randomWheel = bigWheelArr[bigWheelIndex];
      var speechOutput = randomWheel + cardTitle;
      var repromptSpeech = randomWheel + cardTitle;
      var imageObj = {
      smallImageUrl: 'https://s3.amazonaws.com/bigsixwheel/small.png',
      largeImageUrl: 'https://s3.amazonaws.com/bigsixwheel/big.png'
      };
      this.emit(':tellWithCard', speechOutput, repromptSpeech, SKILL_NAME, cardTitle, imageObj);
    },

    'SpinIntent': function () {
      var numbersArr = randomNumbers;
      var numbersIndex = Math.floor(Math.random() * numbersArr.length);
      var randomNum = numbersArr[numbersIndex];
      var cardTitle = randomNum;
      var bigWheelArr = bigWheel;
      var bigWheelIndex = Math.floor(Math.random() * bigWheelArr.length);
      var randomWheel = bigWheelArr[bigWheelIndex];
      var speechOutput = randomWheel + cardTitle;
      var repromptSpeech = randomWheel + cardTitle;
      var imageObj = {
      smallImageUrl: 'https://s3.amazonaws.com/bigsixwheel/small.png',
      largeImageUrl: 'https://s3.amazonaws.com/bigsixwheel/big.png'
      };
      this.emit(':tellWithCard', speechOutput, repromptSpeech, SKILL_NAME, cardTitle, imageObj);
    },

    'AMAZON.HelpIntent': function () {
        this.emit(':ask', HELP_MESSAGE);
    },

    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },

    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },

    'Unhandled': function (){
       this.emit(':ask', HELP_MESSAGE);
  }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
