import {Schema} from 'mongoose';

const Pick = new Schema({
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

export default Pick;
