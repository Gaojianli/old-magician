import { type ObjectId, Schema } from 'mongoose';

export interface Image {
  _id?: ObjectId;
  name: string;
  description?: string;
  path: string;
  directory?: ObjectId;
  thumbnail?: string;
  proecessed: boolean;
  hash: string;
}

export const ImageSchema = new Schema<Image>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  path: { type: String, required: true },
  directory: { type: Schema.Types.ObjectId, ref: 'Directories', index: true },
  thumbnail: { type: String, required: true },
  proecessed: { type: Boolean, required: true, default: false, index: true },
  hash: { type: String, required: true },
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
