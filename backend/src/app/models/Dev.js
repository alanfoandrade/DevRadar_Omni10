import mongoose from 'mongoose';

import PointSchema from './utils/PointSchema';

const DevSchema = new mongoose.Schema({
  name: String,
  git_user: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: PointSchema,
    index: '2dsphere',
  },
});

export default mongoose.model('Dev', DevSchema);
