import { type ObjectId, Schema } from 'mongoose';
import { type Tag } from './tag.js';
export interface Directory {
  _id?: ObjectId;
  name: string;
  description?: string;
  postion?: string;
  tags?: Tag[];
}

export const DirectorySchema = new Schema<Directory>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  postion: { type: String, required: false },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
}, {
  toJSON: {
    transform: function (doc, ret, options) {
      delete ret.__v;
    },
  },
  toObject: {
    transform: function (doc, ret, options) {
      delete ret.__v;
    },
  },
});
