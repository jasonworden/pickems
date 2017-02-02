/*
README

Run command:

node fixtures/load_fixtures.js
*/

import fs from 'fs';
import path from 'path';
import mongoFixtures from 'pow-mongodb-fixtures';
import _ from 'lodash';

const REPO_ROOT_DIR = path.resolve(__dirname, '..');
const FIXTURES_DIR = path.resolve(REPO_ROOT_DIR, 'fixtures');

const fixtures = mongoFixtures.connect('pickems');
const createObjectId = mongoFixtures.createObjectId;

function getJSONFromFile(filepath) {
  var contents = fs.readFileSync(filepath);
  return JSON.parse(contents);
}

function createObjectFromArrayOfObjects(arr, key, generateId = true) {
  let obj = {};
  let item;
  for(let i=0; i<arr.length; ++i) {
    item = arr[i];
    if(generateId) {
      item._id = createObjectId();
    }
    obj[item[key]] = item;
  }
  return obj;
}

function parseFixtureArray(collection, key) {
  // If key is passed, parse into objects with new IDs
  // If no key is passed, return parsed array

  const fixturesLocation = path.resolve(FIXTURES_DIR, `${collection}.json`);
  const arr = getJSONFromFile(fixturesLocation);
  return key ?
    createObjectFromArrayOfObjects(arr, key) : arr;
}

const nflteams = parseFixtureArray('nflteams', "abbreviation");
const weeks = parseFixtureArray('weeks', "number");
const nflconferences = parseFixtureArray('nflconferences', "abbreviation");
const games = parseFixtureArray('games');
const nflseasons = parseFixtureArray('nflseasons', "year");

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
