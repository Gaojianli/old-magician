import { type PathLike } from 'fs';
import crypto from 'crypto';
import fs from 'fs';
import imageThumbnail from 'image-thumbnail';
import path from 'path';
import config from '../config/config.js';

export async function CaculateFileHash (filePath: PathLike): Promise<string> {
  const fd = await fs.promises.open(filePath, 'r');
  const hash = crypto.createHash('sha256').setEncoding('hex');
  return await new Promise((resolve, reject) => {
    fd.createReadStream().pipe(hash).once('error', reject).once('finish', () => {
      resolve(hash.read());
    });
  });
}

export function isPicture (filePath: string): boolean {
  return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(filePath);
}

async function checkFileExists (file: PathLike): Promise<boolean> {
  return await new Promise((resolve, _reject) => {
    resolve(fs.existsSync(file));
  });
}

async function ensureThumbnailFolder (): Promise<boolean> {
  if (await checkFileExists(config.thumbnailLocation)) {
    return await fs.promises.access(config.thumbnailLocation, fs.constants.W_OK).then(() => true).catch(() => false);
  } else {
    return await fs.promises.mkdir(config.thumbnailLocation, { recursive: true }).then(() => true).catch(() => false);
  }
}

export async function GenerateThumbnail (filePath: string): Promise<string> {
  if (!(await ensureThumbnailFolder())) {
    throw new Error('Thumbnail folder is not writable');
  }
  const fileHash = await CaculateFileHash(filePath);
  const thumbnail = await imageThumbnail(filePath, { responseType: 'buffer', width: 256, height: 256, percentage: 80 });
  const thumbnailPath = path.join(config.thumbnailLocation, fileHash) + '.jpg';
  await fs.promises.writeFile(thumbnailPath, thumbnail);
  return thumbnailPath;
}
