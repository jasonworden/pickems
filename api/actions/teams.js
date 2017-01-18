import NFLTeam from '../models/NFLTeam';
import {createKeyedObjectFromArray} from '../utils/misc';

export default function teams() {
  return new Promise((resolve) => {
    NFLTeam.find({}, (err, teams) => {
      let teamsObject = createKeyedObjectFromArray(teams, 'abbreviation');
      resolve(teamsObject);
    });
  });
}
