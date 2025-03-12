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
import { log } from 'node:console';

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
    console.log('ici');

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

    //@ts-ignore
    return res.json({ message: 'Collection founded', result });
  }

  @Get(':collectionId')
  async findOne(
    @Param('collectionId') collectionId: string,
    @Res() res: Response,
  ) {
    console.log('ici');
    console.log('collectionId', collectionId);
    try {
      const result = await this.collectionService.findOne(collectionId);
      console.log(result);
      //@ts-ignore
      return res.status(200).json({
        message: 'Collection founded',
        result
      });
    } catch (error) {
      console.log(error);
    }
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
