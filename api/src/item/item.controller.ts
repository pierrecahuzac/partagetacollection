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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('/api/item')
export class ItemController {
  constructor(private readonly itemService: ItemService, private readonly fileUploadService: FileUploadService) { }
  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
          console.log("item cover", file);
          const newFileName = `${Date.now()}-${file.originalname}`;
          cb(null, newFileName)
        },
      }),
    }),
  )
  async create(
    @Req() req,
    @Body('newItem') itemDto: CreateItemDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {

    const userId = req.user.sub;
    try {
      if (!itemDto) {
        //@ts-ignore
        return res.status(400).json({ message: "Pas d'item à créer" });
      }
      // @ts-ignore

      const createItemDto = JSON.parse(itemDto)

      const createItem = await this.itemService.create(createItemDto, userId);

      if (file) {
        await this.fileUploadService.handleFileUpload(
          //@ts-ignore
          file,
          createItem.id,
        );
      }
      // @ts-ignore
      return res.json(createItem);
    } catch (error) {
      console.log(error);
    }
  }
  @Post('/api/item/:collectionId')
  async createAndAddToUserCollection(
    @Req() req,
    @Body('newItem') itemDto: CreateItemDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const collectionId = itemDto.collection
    const userId = req.user.sub;
    try {
      if (!itemDto) {
        //@ts-ignore
        return res.status(400).json({ message: "Pas d'item à créer" });
      }
      // @ts-ignore

      const createItemDto = JSON.parse(itemDto)

      const createItem = await this.itemService.create(createItemDto, userId);

      if (file) {
        await this.fileUploadService.handleFileUpload(
          //@ts-ignore
          file,
          createItem.id,
        );
      }
      // @ts-ignore
      return res.json(createItem);
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
