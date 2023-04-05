import mongoose from 'mongoose';

export const JobSchema = new mongoose.Schema({
  _id: { type: Buffer, alias: 'id' },
  name: { type: String },
  cron: { type: String, index: true },
  description: { type: String },
  timezone: { type: String },
  date: { type: Date },
});
