exports.skill = {
  appId: 'amzn1.ask.skill.5b127010-df9d-4579-bab0-b7a822c828e1',
  dynamoDBTableName: 'ten-minutes-terror',
};

exports.audioData = [
  {
    "url": 'https://s3.amazonaws.com/shortstoryassetsvsi/tenMinutesofTerror/CruiseShipTilt.mp3',
    "token": "1111",
    "expectedPreviousToken": "1111",
    "offsetInMilliseconds": 0,
    "title": "Cruise Ship Tilt",
    "metadata" : {
      "title": "Cruise Ship Tilt",
      "subtitle":"By Adrienne Dawn",
      "art": {
        "sources": [
          {
            "contentDescription": "CruiseShipTiltSmall",
            "url": "https://s3.amazonaws.com/shortstoryassetsvsi/tenMinutesofTerror/cships.png",
            "widthPixels": 512,
            "heightPixels": 512
          }
        ]
      },
      "backgroundImage": {
        "sources": [
          {
            "contentDescription": "CruiseShipTiltBig",
            "url": "https://s3.amazonaws.com/shortstoryassetsvsi/tenMinutesofTerror/cshipL.png",
            "widthPixels": 1200,
            "heightPixels": 800
          }
        ]
      }
    }
  }
];
