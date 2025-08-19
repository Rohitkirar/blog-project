import { Transform, Type } from 'class-transformer';
import { IsString, IsOptional, IsDate, IsNumber } from 'class-validator';

export class SearchPostDto{
 @IsString()
 @IsOptional()
 search: string;

 @IsDate()
 @IsOptional()
 @Type(() => Date)
 startDate?: Date;

 @IsDate()
 @IsOptional()
 @Type(() => Date)
 endDate?: Date;

 @IsNumber()
 @IsOptional()
 userId: number;
}