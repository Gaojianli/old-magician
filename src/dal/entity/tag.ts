import { Schema } from 'mongoose';
export interface Tag {
  name: string;
}

export const TagSchema = new Schema<Tag>({
  name: { type: String, required: true },
});
