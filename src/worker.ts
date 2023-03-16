import fs from 'fs/promises';
import path from 'path';
import { setInterval } from 'timers/promises';
import { workerData } from 'worker_threads';

import { db } from './dal/mongo.js';
import * as ImageService from './services/images.js';

// read files from a directory
async function readDir (dirPath: string): Promise<void> {
  const files = await fs.readdir(dirPath);
  await Promise.all(files.map(async file => {
    const itemPath = path.join(dirPath, file);
    const stat = await fs.stat(itemPath);
    if (stat.isDirectory()) {
      await readDir(itemPath);
    } else {
      if (ImageService.isPicture(itemPath)) {
        await ProcessNewPicture(itemPath);
      }
    }
  }));
}

async function ProcessNewPicture (itemPath: string): Promise<void> {
  console.log(`Processing ${itemPath}...`);
  const hash = await ImageService.CaculateFileHash(itemPath);
  const file = await db.Image.findOne({ hash });
  if (file === null) { // new file
    console.log(`New file: ${itemPath}`);
    const thumbnail = await ImageService.GenerateThumbnail(itemPath);
    await db.Image.create({
      name: path.basename(itemPath),
      path: itemPath,
      proecessed: false,
      thumbnail,
      hash,
    });
  } else {
    if (file.path !== itemPath) { // File moved
      file.path = itemPath;
      await file.save();
    }
  }
}

async function WorkerMain (): Promise<void> {
  console.log(`Worker started. Watching ${workerData as string}...`);
  await readDir(workerData);
}
// 2 hours
WorkerMain().then(() => {
  console.log('Worker done, start interval');
  setInterval(1000 * 10, async () => { await readDir(workerData); });
}).catch(console.error);
