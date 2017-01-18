import {Schema} from 'mongoose';

const teamSchema = new Schema({
  abbreviation: String,
  location: String,
  name: String,
});

export default Team;
