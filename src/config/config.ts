import process from 'process';
export default {
  port: process.env.PORT === undefined ? 3001 : parseInt(process.env.PORT),
  address: process.env.ADDRESS ?? 'localhost',
  mongodb: process.env.MONGODB_URL ?? 'mongodb://127.0.0.1:27017/om',
  thumbnailLocation: process.env.THUMBNAIL_LOCATION ?? 'thumbnails',
};
