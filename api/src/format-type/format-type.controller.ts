import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormatTypeService } from './format-type.service';
import { CreateFormatTypeDto } from './dto/create-format-type.dto';
import { UpdateFormatTypeDto } from './dto/update-format-type.dto';

@Controller('/api/format-type')
export class FormatTypeController {
  constructor(private readonly formatTypeService: FormatTypeService) { }

  @Post()
  create(@Body() createFormatTypeDto: CreateFormatTypeDto) {
    return this.formatTypeService.create(createFormatTypeDto);
  }

  @Get()
  findAll() {
    try {
      return this.formatTypeService.findAll();
    } catch (error) {
      console.log(error);

    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formatTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormatTypeDto: UpdateFormatTypeDto) {
    return this.formatTypeService.update(+id, updateFormatTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formatTypeService.remove(+id);
  }
}
