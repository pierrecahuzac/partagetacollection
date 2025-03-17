import { Controller, Get, Post, Body, UseGuards, Res } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';


@Controller('/api/tag')

export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  async findAll(@Res() res: Response) {
    console.log('ici');
    const tags = await this.tagService.findAll();
    // @ts-ignore
    return res.json({      message: 'tags founded',      tags,    });
  }
}
