import mongoose, {Schema} from 'mongoose';

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  nflteam: {
    type: Schema.Types.ObjectId,
    ref: 'NFLTeam'
  },
  game: {
    type: Schema.Types.ObjectId,
    ref: 'Game'
  },
  season: {
    type: Schema.Types.ObjectId,
    ref: 'NFLSeason'
  },
  week: {
    type: Schema.Types.ObjectId,
    ref: 'Week'
  },
  isLocked: {
    type: Boolean,
    default: false
  },
  isCorrect: Boolean, //default is null (is this the right syntax for that?)
  isDecided: {
    type: Boolean,
    default: false
  },
});

const Pick = mongoose.model('Pick', schema);

export default Pick;
