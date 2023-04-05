import { Inject, Injectable } from '@nestjs/common';
import { Job, Podcast, jobInput, podcastInput } from './common/types';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ObjectId } from '@highoutput/object-id';
import * as moment from 'moment-timezone';
import * as R from 'ramda';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @Inject('PodcastRepository')
    private podcastRepository: Model<Podcast>,
    @Inject('JobRepository')
    private jobRepository: Model<Job>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createJob(params: Omit<jobInput, 'id'>) {
    const date = moment.tz(params.date, 'Asia/Manila').toDate();
    await new this.jobRepository({
      id: new ObjectId(1).toBuffer(),
      date,
      ...params,
    }).save();
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async checkJobs() {
    const now = moment.tz(new Date(), 'Asia/Manila').toDate();
    const jobs = await this.jobRepository.find().exec();

    const jobsNow = R.filter((job) => {
      if (
        job.date.getDate() === now.getDate() &&
        job.date.getHours() === now.getHours() &&
        job.date.getMinutes() === now.getMinutes()
      ) {
        return true;
      }
      return false;
    }, jobs);

    //create your job here to add podcasts

    return jobsNow;
  }

  async createPodcasts(params: Omit<podcastInput, 'id'>) {
    await new this.podcastRepository({
      id: new ObjectId(2).toBuffer(),
      ...params,
    }).save();
  }

  async podcasts() {
    const podcasts = await this.podcastRepository.find().exec();
    return podcasts;
  }
}
