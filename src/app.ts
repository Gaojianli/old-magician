import { createKoaServer } from 'routing-controllers';
import config from './config/config.js';
import { DirectoryController } from './controller/directory.js';
import 'reflect-metadata';
import { Worker } from 'node:worker_threads';
import { ImageController } from './controller/image.js';

const app = createKoaServer({
  routePrefix: '/api',
  controllers: [DirectoryController, ImageController],
});

// init worker
if (process.env.IMAGE_LOCATION !== undefined) {
  const worker = new Worker('./worker.js', { workerData: process.env.IMAGE_LOCATION });
  worker.on('error', err => {
    throw new Error(`Worker error:${err.message}`);
  });
}

app.listen(config.port, config.address, () => {
  console.log('Server is running on port 3000');
});
