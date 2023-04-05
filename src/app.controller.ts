import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { jobInput, podcastInput } from './common/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('setSchedule')
  async setSchedule(@Body() params: Omit<jobInput, 'id'>) {
    console.log(params);
    await this.appService.createJob(params);
  }

  @Post('createPodcasts')
  async createPodcasts(@Body() params: Omit<podcastInput, 'id'>) {
    console.log(params);
    await this.appService.createPodcasts(params);
  }

  @Get()
  async checkJobs() {
    return await this.appService.checkJobs();
  }

  @Get('podcasts')
  async podcasts() {
    return await this.appService.podcasts();
  }
}
