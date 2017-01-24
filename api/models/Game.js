import mongoose, {Schema} from 'mongoose';

const schema = new Schema({
  awayTeam: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  homeTeam: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  week: {
    type: Schema.Types.ObjectId,
    ref: 'Week'
  },
  season: {
    type: Schema.Types.ObjectId,
    ref: 'NFLSeason'
  },
  startTime: Date,
  isDecided: {
    type: Boolean,
    default: False
  },
  hadOvertime: {
    type: Boolean,
    defalt: False
  },
});

const Game = mongoose.model('Game', schema);

export default Game;
