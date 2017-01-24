import mongoose, {Schema} from 'mongoose';

const schema = new Schema({
  awayTeam: {
    type: Schema.Types.ObjectId,
    ref: 'NFLTeam'
  },
  homeTeam: {
    type: Schema.Types.ObjectId,
    ref: 'NFLTeam'
  },
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'NFLTeam'
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
    default: false
  },
  hadOvertime: {
    type: Boolean,
    defalt: false
  },
});

const Game = mongoose.model('Game', schema);

export default Game;
