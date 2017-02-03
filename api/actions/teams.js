import NFLTeam from '../models/NFLTeam';
import {createObjectFromArrayOfObjects} from '../../utils/misc';

export default function teams() {
  return new Promise((resolve) => {
    NFLTeam.find({}, (err, teams) => {
      let teamsObject = createObjectFromArrayOfObjects(teams, 'abbreviation');
      resolve(teamsObject);
    });
  });
}
