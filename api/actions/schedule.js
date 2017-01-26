import Week from '../models/Week';
import Game from '../models/Game';
import NFLSeason from '../models/NFLSeason';
import _ from 'lodash';
import {createObjectFromArrayOfObjects} from '../utils/misc';

const DUMMY_CURRENT_WEEK_FOR_NOW = 2;

export default function schedule() {
  // TODO: rework this terrible triple-nested callback
  return new Promise(resolve => {
    NFLSeason.findOne({year: 2016}, (err, season) => {
      console.log('SEASON:', season);

      Week.find({season: season._id})
        .populate('season')
        .exec((err, weeks) => {
          let weekObjects = _.map(weeks, week => week.toObject());
          let weeksByNum = createObjectFromArrayOfObjects(weeks, "number");

          let games = Game.find({season: season._id})
            .populate('week homeTeam awayTeam')
            .exec((err, games) => {
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
