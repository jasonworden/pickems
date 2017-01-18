import {Schema} from 'mongoose';

const schema = new Schema({
  homeTeam: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  awayTeam: {
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

const Game = model('Game', schema);

export default Game;
