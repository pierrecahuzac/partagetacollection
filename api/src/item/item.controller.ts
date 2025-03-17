import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('/api/item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createItemDto: CreateItemDto, @Res() res: Response) {
    try {
      console.log(createItemDto);
      
      console.log('ici');

      const item = await this.itemService.create(createItemDto);
      console.log(item);
         // @ts-ignore
      return res.json(item);
    } catch (error) {}
  }

  @Get()
  async findItems(@Res() res: Response) {
    const response = await this.itemService.findItems()
    console.log(response); 
       // @ts-ignore
    return res.json(response);
  }
  
  @Get()
  async findAll(@Res() res: Response) {
    const response = await this.itemService.findAll();

       // @ts-ignore
    return res.json(response);
  }
  @Get()
  async findPublicItems(@Res() res: Response) {
    const response = await this.itemService.findPublicItems();
    console.log(response); 
       // @ts-ignore
    return res.json(response);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
