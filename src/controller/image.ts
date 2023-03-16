import { type ObjectId } from 'mongoose';
import { Body, JsonController, Param, Put } from 'routing-controllers';
import { Image } from '../dal/entity/image.js';
import { db } from '../dal/mongo.js';

@JsonController('/image')
export class ImageController {
  @Put('/:id')
  async updateImage (@Param('id') id: string, @Body() body: Image): Promise<void> {
    const image = await db.Image.findById(id);
    if (image === null) {
      throw new Error('Image not found');
    } else {
      image.name = body.name;
      if (body.description !== undefined) {
        image.description = body.description;
      }
      await image.save();
    }
  }

  @Put('/:id/directory')
  async assignToDirectory (@Param('id') id: string, @Body() body: { directory: ObjectId }): Promise<void> {
    const image = await db.Image.findById(id);
    if (image === null) {
      throw new Error('Image not found');
    } else {
      image.directory = body.directory;
      await image.save();
    }
  }
};
