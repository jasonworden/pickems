import Week from '../models/Week';
import Game from '../models/Game';
import NFLSeason from '../models/NFLSeason';
import _ from 'lodash';
import {createObjectFromArrayOfObjects} from '../utils/misc';

const DUMMY_CURRENT_WEEK_FOR_NOW = 2;

export default function schedule() {
  // TODO: rework this terrible triple-nested callback
  console.log('hit schedule endpt');
  return new Promise( (resolve, reject) => {
    NFLSeason.findOne({year: 2016}, (err, season) => {
      if (err) {
        reject(err);
      }
      console.log('SEASON for load schedule endpt:', season);

      Week.find({season: season._id})
        .populate('season')
        .exec((err, weeks) => {
          if (err) {
            reject(err);
          }
          let weekObjects = _.map(weeks, week => week.toObject());
          let weeksByNum = createObjectFromArrayOfObjects(weeks, "number");

          // TODO: sort games in some way in query
          let games = Game.find({season: season._id})
            .populate('week homeTeam awayTeam')
            .exec((err, games) => {
              if (err) {
                reject(err);
              }
              let gamesByWeekNum = {};
              _.forEach(weeksByNum, week => gamesByWeekNum[week.number] = []);
              _.forEach(games, game => gamesByWeekNum[game.week.number].push(game));
              resolve({
                weeks: weeksByNum,
                currentWeek: DUMMY_CURRENT_WEEK_FOR_NOW,
                games: gamesByWeekNum
              });
          });

      });

    });
  });
}
