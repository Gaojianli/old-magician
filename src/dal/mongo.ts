import mongoose from 'mongoose';
import config from '../config/config.js';
import { DirectorySchema } from './entity/directory.js';
import { ImageSchema } from './entity/image.js';
import { TagSchema } from './entity/tag.js';

await mongoose.connect(config.mongodb).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('failed to connect to MongoDB: ', err);
  process.exit(-1);
});

export const db = {
  Directory: mongoose.model('Directory', DirectorySchema),
  Tag: mongoose.model('Tag', TagSchema),
  Image: mongoose.model('Image', ImageSchema),
};
