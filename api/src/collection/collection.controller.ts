import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('/api/collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Req() req,
    @Body() createCollectionDto: CreateCollectionDto,
    @Res() res: Response,
  ) {
    console.log(createCollectionDto);

    const userId = req.user.sub;
    const collection = await this.collectionService.create(
      createCollectionDto,
      userId,
    );
    console.log(collection);
    //@ts-ignore
    return res.json({ message: 'Collection created', collection });
  }

  @Get()
  async findAll(@Req() req, @Res() res: Response) {
    const userId = req.user.sub;
    const result = await this.collectionService.findAll(userId);
    console.log(result);

    //@ts-ignore
    return res.json({ message: 'Collection founded', result });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    return this.collectionService.update(+id, updateCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionService.remove(+id);
  }
}
