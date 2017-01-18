import mongoose, {Schema} from 'mongoose';

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

const NFLTeam = mongoose.model('NFLTeam', schema);

export default NFLTeam;
