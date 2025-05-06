import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CollectionImageService } from './collection-image.service';
import { CreateCollectionImageDto } from './dto/create-collection-image.dto';
import { UpdateCollectionImageDto } from './dto/update-collection-image.dto';

@Controller('collection-image')
export class CollectionImageController {
  constructor(private readonly collectionImageService: CollectionImageService) {}

  @Post()
  create(@Body() createCollectionImageDto: CreateCollectionImageDto) {
    return this.collectionImageService.create(createCollectionImageDto);
  }

  @Get()
  findAll() {
    return this.collectionImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectionImageDto: UpdateCollectionImageDto) {
    return this.collectionImageService.update(+id, updateCollectionImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionImageService.remove(+id);
  }
}
