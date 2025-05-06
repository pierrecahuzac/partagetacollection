import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemImageService } from './item-image.service';
import { CreateItemImageDto } from './dto/create-item-image.dto';
import { UpdateItemImageDto } from './dto/update-item-image.dto';

@Controller('item-image')
export class ItemImageController {
  constructor(private readonly itemImageService: ItemImageService) {}

  @Post()
  create(@Body() createItemImageDto: CreateItemImageDto) {
    return this.itemImageService.create(createItemImageDto);
  }

  @Get()
  findAll() {
    return this.itemImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemImageDto: UpdateItemImageDto) {
    return this.itemImageService.update(+id, updateItemImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemImageService.remove(+id);
  }
}
