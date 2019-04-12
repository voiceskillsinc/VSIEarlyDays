'use strict';

var AlexaSkill = require('./AlexaSkill'),
    recipes = require('./recipes');

var APP_ID = 'amzn1.ask.skill.c4d10de8-a9fd-4fcb-ac44-bdefa62f2491';
var HowTo = function () {
    AlexaSkill.call(this, APP_ID);
};

var SKILL_NAME = "Official Star Wars Universe Characteristic Information";
// Extend AlexaSkill
HowTo.prototype = Object.create(AlexaSkill.prototype);
HowTo.prototype.constructor = HowTo;

HowTo.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechText = " Welcome to the Unofficial Star Wars Galaxy Characteristic Information.  Ask questions like, what's the characteristics for an X-wing or Yoda.";
    var repromptText = "For instructions on what you can say, please say help me.";
    response.ask(speechText, repromptText);
};

HowTo.prototype.intentHandlers = {
    "StarWarsUniverse": function (intent, session, response) {
        var itemSlot = intent.slots.universe,
            itemName;
        if (itemSlot && itemSlot.value){
            itemName = itemSlot.value.toLowerCase();
        }

        var cardTitle = itemName,
            recipe = recipes[itemName],
            speechOutput,
            repromptOutput;
        if (recipe) {
            speechOutput = {
                speech: itemName + "  "  + recipe,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.tellWithCard(speechOutput, cardTitle, recipe);
        } else {
            var speech;
            if (itemName) {
                speech = "I'm sorry, I currently do not know the characteristics for " + itemName + ". What else can I help with?";
            } else {
                speech = "I'm sorry, I currently do not know the characteristics for that. What else can I help with?";
            }
            speechOutput = {
                speech: speech,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            repromptOutput = {
                speech: "What else can I help with?",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.ask(speechOutput, repromptOutput);
        }
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "You can ask what is the characteristics for a certain person, place or thing in the Star Wars Galaxy, what can I help you with?";
        var repromptText = "You can ask what is the characteristics for a certain person, place or thing in the Star Wars Galaxy, what can I help you with?";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    },

    "Unhandled": function (intent, session, response) {
      var speechOutput = "You can ask what is the characteristics for a certain person, place or thing in the Star Wars Galaxy, what can I help you with?";
      var cardTitle = "You can ask what is the characteristics for a certain person, place or thing in the Star Wars Galaxy, what can I help you with?";
      response.askWithCard(speechOutput, SKILL_NAME, cardTitle);
    }
};

exports.handler = function (event, context) {
    var howTo = new HowTo();
    howTo.execute(event, context);
};
