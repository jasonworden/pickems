import {Schema, model} from 'mongoose';

const schema = new Schema({
  number: {
    type: Number,
    min: 1,
    max: 17
  },
  arePicksAllowed: Boolean,
  firstDay: Date,
  lastDay: Date,
  beginTime: Date,
  season: {
    type: Schema.Types.ObjectId,
    ref: 'NFLSeason'
  },
});

const model('Week', schema);

export default Weeek;
