import {Schema, model} from 'mongoose';

const schema = new Schema({
  abbreviation: String,
  location: String,
  name: String,
  conference: {
    type: Schema.Types.ObjectId,
    ref: 'NFLConference'
  },
  division: {
    type: Schema.Types.ObjectId,
    ref: 'NFLDivision'
  },
});

const NFLTeam = model('NFLTeam', schema);

export default NFLTeam;
