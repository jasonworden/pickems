import {Schema, model} from 'mongoose';

const schema = new Schema({
  year: Date
});

const NFLSeason = model('NFLSeason', schema);

export default NFLSeason;
