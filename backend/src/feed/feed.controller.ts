import { Controller, Get, Query, HttpCode } from '@nestjs/common';
import { FeedService } from './feed.service.js';
import { FeedQueryDto } from './dto/feed-query.dto.js';

@Controller('api/feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  @HttpCode(200)
  async getFeed(@Query() query: FeedQueryDto) {
    return this.feedService.getFeed(query);
  }
}