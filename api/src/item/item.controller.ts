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
  UploadedFiles,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CollectionItemService } from 'src/collection-item/collection-item.service';
import { ImageService } from 'src/image/image.service';

@Controller('/api/item')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly fileUploadService: FileUploadService,
    private readonly collectionItemService: CollectionItemService,
    private readonly imageService: ImageService
  ) { }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([  // Utilisation de FileFieldsInterceptor pour plusieurs fichiers sous le même champ 'files'
      { name: 'files', maxCount: 10 },  // 'files' correspond à ce que tu envoies du côté frontend
    ], {
      storage: diskStorage({
        destination: './uploads/', // Dossier où les fichiers seront stockés
        filename: (req, file, cb) => {
          const newFileName = `${Date.now()}-${file.originalname}`;
          cb(null, newFileName);  // Génère un nouveau nom pour chaque fichier
        },
      }),
    }),
  )
  async create(
    @Req() req: { user: { sub: string } },
    @Body('newItem') itemDto: CreateItemDto,
    @UploadedFiles() covers: { files: Express.Multer.File[] },
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
      console.log("createItem", createItem.id);

      if (covers && covers.files.length > 0) {
        for (const cover of covers.files) {
          // const filesToUpload = await this.fileUploadService.handleFileUpload(cover, createItem.id);
          const filesToUpload = await this.fileUploadService.uploadItemCovers(cover, createItem.id, userId);
          console.log(filesToUpload);
        }
      }
      // const imagesData = covers?.files?.map((file: { filename: string }, index) => ({
      //   url: `/uploads/${file.filename}`,
      //   itemId: createItem.id,
      //   userId,
      //   isCover: index === 0,
      // }));

      // await this.imageService.createMany(imagesData);
      //@ts-ignore
      return res.status(201).json({ message: 'Item créé avec succès', createItem });

    } catch (error) {
      console.log(error);
    }
  }

  @Post(':collectionId')
  @UseGuards(AuthGuard)
  async createAndAddToUserCollection(
    @Req() req,
    @Body('newItem') itemDto: CreateItemDto,
    @UploadedFile() covers: Express.Multer.File[],
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

      if (covers && covers.length > 0) {
        for (const cover of covers) {
          await this.fileUploadService.uploadItemCovers(
            //@ts-ignore
            cover,
            createItem.id,
            userId
          );
        }
      }

      //@ts-ignore
      const imagesData = covers?.files?.map((file: { filename: string }, index: number) => ({
        url: `/uploads/${file.filename}`,
        itemId: createItem.id,
        userId,
        isCover: index === 0,
      }));
      await this.imageService.createMany(imagesData);
      console.log(createItem, imagesData);
      // @ts-ignore
      
      return res.json({ message: "Item crée avec succès", createItem });
    } catch (error) {
      console.log(error);
    }
  }
  @Get()
  @UseGuards(AuthGuard)
  async getAllItems(@Res() res: Response) {
    const response = await this.itemService.findAll();

    // @ts-ignore
    return res.json(response);
  }
  @Get("user-items")
  @UseGuards(AuthGuard)
  async findAllUserItems(@Res() res: Response, @Req() req) {
    const userId = req.user.sub;
    const response = await this.itemService.findAllUserItems(userId);


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
