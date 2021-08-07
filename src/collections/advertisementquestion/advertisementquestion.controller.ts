import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdvertisementQuestionService } from './advertisementquestion.service';
import { CreateAdvertisementQuestionDto } from './dto/create-advertisementquestion.dto';

@Controller('advquestion')
export class AdvertisementQuestionController {
  constructor(
    private readonly advertisementQuestionService: AdvertisementQuestionService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  register(
    @Request() req,
    @Body() createAdvertisementQuestionDto: CreateAdvertisementQuestionDto,
  ) {
    return this.advertisementQuestionService.create(
      createAdvertisementQuestionDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.advertisementQuestionService.findAll();
  }
}
