import { ObjectId } from '@highoutput/object-id';

export type Job = {
  id: ObjectId;
  name: string;
  cron?: string;
  description?: string;
  timeZone?: string;
  date: Date;
};

export type jobInput = Job;

export type Podcast = {
  id: ObjectId;
  name: string;
  email?: string;
};

export type podcastInput = Podcast;
