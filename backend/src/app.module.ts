import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { FeedModule } from './feed/feed.module.js';

@Module({
  imports: [
    PrismaModule,
    FeedModule,
  ],
})
export class AppModule { }
