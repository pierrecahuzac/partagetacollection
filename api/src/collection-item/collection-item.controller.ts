import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CollectionItemService } from './collection-item.service';
import { CreateCollectionItemDto } from './dto/create-collection-item.dto';
import { UpdateCollectionItemDto } from './dto/update-collection-item.dto';

@Controller('/api/collection-item')
export class CollectionItemController {
  constructor(private readonly collectionItemService: CollectionItemService) { }

  @Post()
  create(@Body() createCollectionItemDto: CreateCollectionItemDto) {
    const { createItemId, userId, collectionId } = createCollectionItemDto
    return this.collectionItemService.create(createItemId, userId, collectionId);
  }

  @Get()
  findAll() {
    return this.collectionItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollectionItemDto: UpdateCollectionItemDto) {
    return this.collectionItemService.update(+id, updateCollectionItemDto);
  }

  @Delete(":id")
  async remove(
    @Param('id') itemId: string,
    @Query('collectionId') collectionId: string
  ) {
    try {
      const result = await this.collectionItemService.remove(itemId, collectionId);


      return { message: "Item supprimé de la collection avec succès" }
    } catch (error) {
      console.log(error)
    }
  }
}
