/*
README

Run command:

node fixtures/load_fixtures.js
*/

import _ from 'lodash';
import parseArgs from 'minimist';
import {connectToMongoDB} from '../utils/database';

import Week from '../api/models/Week';
import NFLSeason from '../api/models/NFLSeason';
import Pick from '../api/models/Pick';

const args = parseArgs(process.argv.slice(2));

connectToMongoDB(() => markDecidedPicks(args.year, args.week));

function markDecidedPicks(year, weekNumber, exitAfterwards = true) {
  NFLSeason.findOne({year}, (err, season) => {
    if (err) {
      throw err;
    }

    Week.findOne({season: season._id, number: weekNumber})
      .populate('season')
      .exec((err, week) => {
        if (err) {
          throw err;
        }

        console.log('Week info:', week);

        Pick.find({week: week._id})
          .populate('nflteam game week user')
          .exec((err, picks) => {
            if (err) {
              throw err;
            }

            console.log(`Marking ${picks.length} picks now...`);

            _.forEach(picks, pick => {
              if (!pick.game.isDecided) {
                return;
              }

              pick.isLocked = true;
              pick.isDecided = true;
              pick.isCorrect = (pick.nflteam._id == pick.game.winner);
              pick.save((err, savedPick) => {
                if (err) {
                  throw err;
                }
                console.log(
                  `Saved ${pick.user.name}'s pick for ${pick.nflteam.abbreviation} ` +
                  `as isCorrect === ${savedPick.isCorrect}`
                );
              })
            });

            if (exitAfterwards) {
              process.exit();
            }
          });

      });

  });
}