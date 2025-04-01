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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('/api/collection')
export class CollectionController {
  constructor(
    private readonly collectionService: CollectionService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        // ✅ Ajoute `diskStorage()` ici aussi
        destination: './uploads/',
        filename: (req, file, cb) => {
          const newFileName = `${Date.now()}-${file.originalname}`;
          cb(null,newFileName)         
        },
      }),
    }),
  )
  async create(
    @Req() req,
    @Body('newCollection') newCollectionString: string,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {  
      if (!newCollectionString) {
        //@ts-ignore
        return res.status(400).json({ message: 'newCollection est requis' });
      }
      const createCollectionDto: CreateCollectionDto =
        JSON.parse(newCollectionString);
      if (!createCollectionDto.title || !createCollectionDto.description) {
        return (
          res
            //@ts-ignore
            .status(400)
            .json({ message: 'title et description sont obligatoires' })
        );
      }
      const userId = req.user.sub;
      if (!userId) {
        //@ts-ignore
        return res.status(401).json({ message: 'Utilisateur non authentifié' });
      }

      const createCollection = await this.collectionService.create(
        createCollectionDto,
        userId,
      );

      if (file) {
   
        const updateCollection = await this.fileUploadService.handleFileUpload(
          file,
          createCollection.id,
        );
     
      }
      return (
        res
          // @ts-ignore
          .status(201)
          .json({ message: 'Collection créée avec succès', createCollection })
      );
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  async findAll(@Req() req, @Res() res: Response) {

    
    if (!req.user) {      
      // ✅ Si l'utilisateur n'est pas connecté, il ne voit que les collections publiques
      const result = await this.collectionService.findAll(null);
      // @ts-ignore
      return res.json({ message: 'Collections publiques récupérées', result });
    }

    const userId = req.user.sub;

    
    const result = await this.collectionService.findAll(userId);

    // @ts-ignore
    return res.json({ message: 'Collection founded', result });
  }
  @Get("/user-collection")
  async findAllUserCollection(@Req() req, @Res() res: Response) {

    const userId = req.user.sub;

    
    const result = await this.collectionService.findAllUserCollection(userId);

    // @ts-ignore
    return res.json({ message: 'Collection founded', result });
  }

  @Get(':collectionId')
  async findOne(
    @Param('collectionId') collectionId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.collectionService.findOne(collectionId);
      // @ts-ignore
      return res.status(200).json({
        message: 'Collection founded',
        result,
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
