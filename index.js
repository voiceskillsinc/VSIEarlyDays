'use strict';

const data = require('./data');
const title = require('./title');

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const now = new Date();
const dateForData = (now.getMonth()+1) +'/'+ now.getDate();
const dateForTitle = (now.getMonth()+1) +'/'+ now.getDate();
const dateForStream = months[now.getMonth()] + ' ' + now.getDate();
const jsonDate = now.toJSON();

exports.handler = function(event, context, callback) {
    console.log(JSON.stringify(event));
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            uid: 'urn:uuid:1335c695-cfb8-4ebb-abbd-81da344efa6b',
            updateDate: jsonDate,
            titleText: title[dateForTitle],
            mainText: "",
            streamUrl: data[dateForData],
            redirectionUrl: "http://www.longoriahausdogtraining.com"
        })
    };
    callback(null, response);
};


