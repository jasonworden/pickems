/*
README

Run command:

node fixtures/load_fixtures.js
*/

var fs = require("fs");
var path = require('path');
var mongoFixtures = require('pow-mongodb-fixtures');
var _ = require('lodash');

const REPO_ROOT_DIR = path.resolve(__dirname, '..');
const FIXTURES_DIR = path.resolve(REPO_ROOT_DIR, 'fixtures');

var fixtures = mongoFixtures.connect('pickems');
var createObjectId = mongoFixtures.createObjectId;

function getJSONFromFile(filepath) {
  var contents = fs.readFileSync(filepath);
  return JSON.parse(contents);
}

function createObjectFromArrayOfObjects(arr, key, generateId) {
  generateId = typeof generateId === 'undefined' ?
    true : generateId; //defaults to true;
  var obj = {};
  var item;
  for(var i=0; i<arr.length; ++i) {
    item = arr[i];
    if(generateId) {
      item._id = createObjectId();
    }
    obj[item[key]] = item;
  }
  return obj;
}

function parseFixtureArray(collection, key) {
  // If key is passed, parse into objects with IDs
  // If no key is passed, return parsed array

  const fixturesLocation = path.resolve(FIXTURES_DIR, `${collection}.json`);
  var arr = getJSONFromFile(fixturesLocation);
  return key !== undefined ?
    createObjectFromArrayOfObjects(arr, key) : arr;
}

var nflteams = parseFixtureArray('nflteams', "abbreviation");
var weeks = parseFixtureArray('weeks', "number");
var nflconferences = parseFixtureArray('nflconferences', "abbreviation");
var games = parseFixtureArray('games');
var nflseasons = parseFixtureArray('nflseasons', "year");

_.forEach(nflteams, function(team) {
  team.conference = nflconferences[team.conference]._id;
});

_.forEach(weeks, function(week) {
  week.season = nflseasons["2016"]._id;
});

_.forEach(games, function(game) {
  game.homeTeam = nflteams[game.homeTeam]._id;
  game.awayTeam = nflteams[game.awayTeam]._id;
  if(game.winner) {
    game.winner = nflteams[game.winner]._id;
  }
  if(game.loser) {
    game.loser = nflteams[game.loser]._id;
  }
  game.week = weeks[game.week]._id;
  game.season = nflseasons["2016"]._id;
});

var data = {
  nflteams: nflteams,
  weeks: weeks,
  nflconferences: nflconferences,
  games: games,
  nflseasons: nflseasons
};

console.log('About to clear and load fixtures...');

fixtures.clearAndLoad(data, function() {
  console.log('Done!');
  process.exit();
});
