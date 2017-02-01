import _ from 'lodash';
import {createObjectFromArrayOfObjects} from '../../utils/misc';
import Pick from '../../models/Pick';
import NFLSeason from '../../models/NFLSeason';
import Week from '../../models/Week';

export default function load(req) {
  return new Promise((resolve, reject) => {
    const { user } = req.body;

    // TODO: pull user securely off the session, not from the posted data
    if (!user) {
      reject('Please log in to get your picks. User given: ' + user);
      return;
    }

    NFLSeason.findOne({year: 2016}, (err, season) => {
      console.log('found season for load picks endpt', season.year);

      Week.find({season: season._id})
        .populate('season')
        .exec((err, weeks) => {
          let weekObjects = _.map(weeks, week => week.toObject());
          let weeksByNum = createObjectFromArrayOfObjects(weeks, "number");
          if (weeksByNum[17]) {
            delete weeksByNum[17];
          }

          // TODO: sort picks in some way in query
          let picks = Pick.find({season: season._id, user: user._id})
            .populate('nflteam game week')
            .exec((err, picks) => {
              let picksByWeekNum = {};
              let pickedTeams = {};
              let lockedTeams = {};
              _.forEach(weeksByNum, week => picksByWeekNum[week.number] = {});
              _.forEach(picks, pick => {
                const abbrev = pick.nflteam.abbreviation;

                picksByWeekNum[pick.week.number][abbrev] = pick;
                pickedTeams[abbrev] = {
                  ...pick.nflteam,
                  pickId: pick._id,
                  weekNum: pick.week.number
                };
                if (pick.isLocked) {
                  lockedTeams[abbrev] = {
                    ...pick.nflteam,
                    pickId: pick._id,
                    weekNum: pick.week.number
                  };
                }
              });
              resolve({
                weeks: picksByWeekNum,
                pickedTeams,
                lockedTeams,
              });
          });

      });

    });

  });

}
