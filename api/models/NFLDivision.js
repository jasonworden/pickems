import {Schema} from 'mongoose';

const schema = new Schema({
  conference: {
    type: Schema.Types.ObjectId,
    ref: 'NFLConference'
  },
  name: String
});

const NFLDivision = model('NFLDivision', schema);

export default NFLDivision;
