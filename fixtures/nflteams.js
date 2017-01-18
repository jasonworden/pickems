/*
README

Load via command:

mongofixtures pickems fixtures/nflteams.js
*/

var id = require('pow-mongodb-fixtures').createObjectId;

var nflteams = exports.nflteams = [
  {
    "_id": id(),
    "abbreviation": "ARI",
    "location": "Arizona",
    "name": "Cardinals",
  },
  {
    "_id": id(),
    "abbreviation": "ATL",
    "location": "Atlanta",
    "name": "Falcons"
  },
  {
    "_id": id(),
    "abbreviation": "BAL",
    "location": "Baltimore",
    "name": "Ravens"
  },
  {
    "_id": id(),
    "abbreviation": "BUF",
    "location": "Buffalo",
    "name": "Bills"
  },
  {
    "_id": id(),
    "abbreviation": "CAR",
    "location": "Carolina",
    "name": "Panthers"
  },
  {
    "_id": id(),
    "abbreviation": "CHI",
    "location": "Chicago",
    "name": "Bears"
  },
  {
    "_id": id(),
    "abbreviation": "CIN",
    "location": "Cincinnati",
    "name": "Bengals"
  },
  {
    "_id": id(),
    "abbreviation": "CLE",
    "location": "Cleveland",
    "name": "Browns"
  },
  {
    "_id": id(),
    "abbreviation": "DAL",
    "location": "Dallas",
    "name": "Cowboys"
  },
  {
    "_id": id(),
    "abbreviation": "DEN",
    "location": "Denver",
    "name": "Broncos"
  },
  {
    "_id": id(),
    "abbreviation": "DET",
    "location": "Detroit",
    "name": "Lions"
  },
  {
    "_id": id(),
    "abbreviation": "GB",
    "location": "Green Bay",
    "name": "Packers"
  },
  {
    "_id": id(),
    "abbreviation": "HOU",
    "location": "Houston",
    "name": "Texans"
  },
  {
    "_id": id(),
    "abbreviation": "IND",
    "location": "Indianapolis",
    "name": "Colts"
  },
  {
    "_id": id(),
    "abbreviation": "JAX",
    "location": "Jacksonville",
    "name": "Jaguars"
  },
  {
    "_id": id(),
    "abbreviation": "KC",
    "location": "Kansas City",
    "name": "Chiefs"
  },
  {
    "_id": id(),
    "abbreviation": "LAC",
    "location": "Los Angeles",
    "name": "Chargers"
  },
  {
    "_id": id(),
    "abbreviation": "LAR",
    "location": "Los Angeles",
    "name": "Rams"
  },
  {
    "_id": id(),
    "abbreviation": "MIA",
    "location": "Miami",
    "name": "Dolphins"
  },
  {
    "_id": id(),
    "abbreviation": "MIN",
    "location": "Minnesota",
    "name": "Vikings"
  },
  {
    "_id": id(),
    "abbreviation": "NE",
    "location": "New England",
    "name": "Patriots"
  },
  {
    "_id": id(),
    "abbreviation": "NO",
    "location": "New Orleans",
    "name": "Saints"
  },
  {
    "_id": id(),
    "abbreviation": "NYG",
    "location": "New York",
    "name": "Giants"
  },
  {
    "_id": id(),
    "abbreviation": "NYJ",
    "location": "New York",
    "name": "Jets"
  },
  {
    "_id": id(),
    "abbreviation": "OAK",
    "location": "Oakland",
    "name": "Raiders"
  },
  {
    "_id": id(),
    "abbreviation": "PHI",
    "location": "Philadelphia",
    "name": "Eagles"
  },
  {
    "_id": id(),
    "abbreviation": "PIT",
    "location": "Pittsburgh",
    "name": "Steelers"
  },
  {
    "_id": id(),
    "abbreviation": "SEA",
    "location": "Seattle",
    "name": "Seahawks"
  },
  {
    "_id": id(),
    "abbreviation": "SF",
    "location": "San Francisco",
    "name": "49ers"
  },
  {
    "_id": id(),
    "abbreviation": "TB",
    "location": "Tampa Bay",
    "name": "Buccaneers"
  },
  {
    "_id": id(),
    "abbreviation": "TEN",
    "location": "Tennessee",
    "name": "Titans"
  },
  {
    "_id": id(),
    "abbreviation": "WSH",
    "location": "Washington",
    "name": "Redskins"
  }
];
