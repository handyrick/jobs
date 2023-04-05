import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';
import { JobSchema } from './common/schema/job-schema';
import { PodcastSchema } from './common/schema/member-schema';
import { Job } from './common/types';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'test',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'JobRepository',
      useFactory: async (connection: Connection) => {
        return connection.model<Job>('JobRepository', JobSchema, 'jobs');
      },
      inject: ['DatabaseConnection'],
    },
    {
      provide: 'PodcastRepository',
      useFactory: async (connection: Connection) => {
        return connection.model<Job>(
          'PodcastRepository',
          PodcastSchema,
          'podcasts',
        );
      },
      inject: ['DatabaseConnection'],
    },
  ],
})
export class AppModule {}
