import {Schema} from 'mongoose';

const gameSchema = new Schema({
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
  startTime: Date
});

export default Game;
