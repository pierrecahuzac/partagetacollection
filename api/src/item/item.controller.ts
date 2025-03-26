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
  Req,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('/api/item')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createItemDto: CreateItemDto,
    @Res() res: Response,
    @Req() req,
  ) {
    const userId = req.user.sub;
    try {
      const item = await this.itemService.create(createItemDto, userId);
      console.log(item);
      
      // @ts-ignore
      return res.json(item);
    } catch (error) {
      console.log(error);

    }
  }



  @Get()
  async findAll(@Res() res: Response, @Req() req) {
    
    const query = req.query
    const response = await this.itemService.findAll(query);
    // @ts-ignore
    return res.json(response);
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    const item = this.itemService.findOne(id);
     return item
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
