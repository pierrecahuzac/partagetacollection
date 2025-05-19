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
import { CollectionItemService } from 'src/collection-item/collection-item.service';

@Controller('/api/item')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly fileUploadService: FileUploadService,
    private readonly collectionItemService: CollectionItemService) { }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
          const newFileName = `${Date.now()}-${file.originalname}`;
          cb(null, newFileName)
        },
      }),
    }),
  )
  async create(
    @Req() req: { user: { sub: string } },
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

  @Post(':collectionId')
  @UseGuards(AuthGuard)
  async createAndAddToUserCollection(
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
      if (createItemDto.collectionToAddItem === "") {
        const addItemToCollection = await this.collectionItemService.create(createItem.id, userId, createItemDto.collectionId)


      }
      // @ts-ignore
      return res.json(createItem);
    } catch (error) {
      console.log(error);
    }
  }
  @Get()
  @UseGuards(AuthGuard)
  async getAllItems(@Res() res: Response) {
    const response = await this.itemService.findAll();
    console.log(response);
    // @ts-ignore
    return res.json(response);
  }
  @Get("user-items")
  @UseGuards(AuthGuard)
  async findAllUserItems(@Res() res: Response, @Req() req) {
    const userId = req.user.sub;
    const response = await this.itemService.findAllUserItems(userId);
    console.log(response);

    // @ts-ignore
    return res.json(response);
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    const item = this.itemService.findOne(id);
    return item
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return "delete item"
    //return this.itemService.remove(id);
  }


}
