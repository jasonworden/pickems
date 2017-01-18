import {Schema, model} from 'mongoose';

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
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
  isCorrect: Boolean,
  isDecided: {
    type: Boolean,
    default: False
  },
});

const Pick = model('Pick', schema);

export default Pick;
