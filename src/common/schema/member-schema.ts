import mongoose from 'mongoose';

export const PodcastSchema = new mongoose.Schema({
  _id: { type: Buffer, alias: 'id' },
  name: { type: String },
  email: { type: String, index: true },
});
