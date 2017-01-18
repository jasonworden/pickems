import mongoose, {Schema} from 'mongoose';

const schema = new Schema({
  abbreviation: {
    type: String,
    enum: ['AFC', 'NFC']
  },
  fullName: {
    type: String,
    enum: [
      'American Football Conference',
      'National Football Conference'
    ]
  },
});

const NFLConference = mongoose.model('NFLConference', schema);

export default NFLConference;
