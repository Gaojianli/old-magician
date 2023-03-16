import { Directory } from '../dal/entity/directory.js';
import { Body, JsonController, Post, Get, Param } from 'routing-controllers';
import { db } from '../dal/mongo.js';
@JsonController('/directory')
export class DirectoryController {
  @Post('/')
  async create (@Body() body: Directory): Promise<Directory> {
    return await (await db.Directory.create(body)).toObject();
  }

  @Get('/list')
  async list (): Promise<Directory[]> {
    return await db.Directory.find().lean().exec();
  }

  @Get('/list/:id')
  async listById (@Param('id') id: string): Promise<Directory> {
    return await db.Directory.findById(id).populate('images').lean().exec();
  }

  @Post('/')
  async createDirectory (@Body() body: Directory): Promise<Directory> {
    return await (await db.Directory.create(body)).toObject();
  }
};
