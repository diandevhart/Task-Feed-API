import { IsOptional, IsInt, Min, Max, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FeedQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: 'Limit must be an integer' })
  @Min(1, { message: 'Limit must be at least 1' })
  @Max(50, { message: 'Limit must not exceed 50' })
  limit?: number = 20;

  @IsOptional()
  @IsString({ message: 'Cursor must be a string' })
  cursor?: string;
}