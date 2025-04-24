import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CollectionStatusService } from './collection-status.service';
import { CreateCollectionStatusDto } from './dto/create-collection-status.dto';
import { UpdateCollectionStatusDto } from './dto/update-collection-status.dto';
import { CollectionStatus } from '../enums/collection-status.enum';
@Controller('/api/collection-status')
export class CollectionStatusController {
  constructor(private readonly collectionStatusService: CollectionStatusService) {}

  @Post()
  create(@Body() createCollectionStatusDto: CreateCollectionStatusDto) {
    return this.collectionStatusService.create(createCollectionStatusDto);
  }

  @Get()
  findAll() {
    return Object.values(CollectionStatus);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectionStatusDto: UpdateCollectionStatusDto) {
    return this.collectionStatusService.update(+id, updateCollectionStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionStatusService.remove(+id);
  }
}
