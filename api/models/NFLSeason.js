import mongoose, {Schema} from 'mongoose';

const schema = new Schema({
  year: Number
});

const NFLSeason = mongoose.model('NFLSeason', schema);

export default NFLSeason;
