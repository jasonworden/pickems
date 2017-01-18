import {Schema} from 'mongoose';

const Week = new Schema({
  number: {
    type: Number,
    min: 1,
    max: 17
  },
  arePicksAllowed: Boolean,
  firstDay: Date,
  lastDay: Date,
  beginTime: Date,
});

export default Week;
