import Pick from '../../models/Pick';

export default function load(req) {
  return new Promise((resolve, reject) => {
    const { user } = req.body;

    // TODO: pull user securely off the session, not from the posted data
    if (!user) {
      reject({ error: "Not logged in" });
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
              let pickedTeams = [];
              let lockedTeams = [];
              _.forEach(weeksByNum, week => picksByWeekNum[week.number] = []);
              _.forEach(picks, pick => {
                picksByWeekNum[pick.week.number].push(pick);
                pickedTeams.push({
                  ...pick.team,
                  pickId: pick._id,
                  weekNum: pick.week.number
                });
                if (pick.isLocked) {
                  lockedTeams.push({
                    ...pick.team,
                    pickId: pick._id,
                    weekNum: pick.week.number
                  });
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
