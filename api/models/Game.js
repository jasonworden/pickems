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
  week: {
    type: Schema.Types.ObjectId,
    ref: 'Week'
  },
  season: {
    type: Schema.Types.ObjectId,
    ref: 'NFLSeason'
  },
  startTime: Date
});

const Game = mongoose.model('Game', schema);

export default Game;
