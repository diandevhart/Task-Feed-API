import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { FeedQueryDto } from './dto/feed-query.dto.js';

@Injectable()
export class FeedService {
  constructor(private readonly prismaService: PrismaService) { }

  async getFeed(query: FeedQueryDto) {
    const { limit = 20, cursor } = query;

    const tasks = await this.prismaService.task.findMany({
      take: limit + 1,
      where: this.whereClause(cursor),
      orderBy: [
        { createdAt: 'desc' },
        { id: 'desc' }
      ],
      include: {
        project: {
          select: { id: true, name: true }
        },
        assignee: {
          select: { id: true, name: true }
        },
        tags: {
          include: {
            tag: {
              select: { id: true, name: true }
            }
          }
        },
        _count: {
          select: { comments: true }
        },
        comments: {
          take: 1,
          orderBy: { createdAt: 'desc' },
          include: {
            author: {
              select: { id: true, name: true }
            }
          }
        }
      }
    });

    const hasMore = tasks.length > limit;
    const itemsToReturn = hasMore ? tasks.slice(0, limit) : tasks;
    let nextCursor = null;

    if (hasMore) {
      const lastTask = itemsToReturn[itemsToReturn.length - 1];
      if (lastTask) {
        const cursorData = {
          createdAt: lastTask.createdAt.toISOString(),
          id: lastTask.id
        };
        nextCursor = Buffer.from(JSON.stringify(cursorData)).toString('base64');
      }
    }

    const items = itemsToReturn.map(task => ({
      id: task.id,
      title: task.title,
      status: task.status,
      project: task.project,
      assignee: task.assignee,
      tags: task.tags.map(taskTag => taskTag.tag),
      commentsCount: task._count.comments,
      lastComment: task.comments.length > 0 && task.comments[0] ? {
        id: task.comments[0].id,
        createdAt: task.comments[0].createdAt.toISOString(),
        author: task.comments[0].author,
        snippet: this.createSnippet(task.comments[0].body)
      } : null,
      createdAt: task.createdAt.toISOString()
    })
    );

    return {
      items,
      nextCursor: nextCursor || null
    };
  }
  private whereClause(cursor?: string) {
    if (!cursor) {
      return {};
    }
    try {
      const decoded = Buffer.from(cursor, 'base64').toString('ascii');
      const { createdAt, id } = JSON.parse(decoded);
      return {
        OR: [
          { createdAt: { lt: new Date(createdAt) } },
          {
            AND: [
              { createdAt: new Date(createdAt) },
              { id: { lt: id } }
            ]
          }
        ]
      };
    } catch (error) {
      console.log('Invalid cursor format:', error);
      return {};
    }
  }

  private createSnippet(body: string): string {
    if (body.length <= 120) {
      return body;
    }
    return body.substring(0, 120) + '…';
  }
}