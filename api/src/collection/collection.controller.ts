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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { ImageService } from 'src/image/image.service';

@Controller('/api/collection')
export class CollectionController {
  constructor(
    private readonly collectionService: CollectionService,
    private readonly fileUploadService: FileUploadService,
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
    @Req() req,
    @Body('newCollection') newCollectionString: string,
    @UploadedFiles() files: Express.Multer.File[],  // Récupère tous les fichiers envoyés sous 'files'
    @Res() res: Response,
  ) {
    try {
      //@ts-ignore

      const arrayOfCover: [] = files.files

      if (!newCollectionString) {
        return res.json();
      }
      const createCollectionDto: CreateCollectionDto = JSON.parse(newCollectionString);
      if (!createCollectionDto.title) {
        return res.status(400).json({ message: 'title et description sont obligatoires' });
      }

      const userId = req.user.sub;
      if (!userId) {
        return res.status(401).json({ message: 'Utilisateur non authentifié' });
      }
      const createCollection = await this.collectionService.create(createCollectionDto, userId);

      if (files && files.length > 0) {
        for (const file of files) {

          await this.fileUploadService.handleFileUpload(file, createCollection.id);
        }
      }

      //@ts-ignore
      const imagesData = arrayOfCover.map((file: { filename: string }, index) => ({
        url: `/uploads/${file.filename}`, // adapte selon ton dossier d’upload
        collectionId: createCollection.id,
        userId,
        isCover: index === 0, // true pour la première image
      }));



      const createImageCoverCollection = await this.imageService.createMany(imagesData);
      return res.status(201).json({ message: 'Collection créée avec succès', createCollection });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erreur interne du serveur' });

    }
  }

  @Get()
  async findAll(@Req() req, @Res() res: Response) {
    if (!req.user) {
      const result = await this.collectionService.findAll();
      // @ts-ignore
      return res.json({ message: 'Collections publiques récupérées', result });
    }
    const userId = req.user.sub;
    const result = await this.collectionService.findAllUserCollection(userId);


    // @ts-ignore
    return res.json({ message: 'Collection founded', result });
  }
  @Get("/user-collection")
  async findAllUserCollection(@Req() req,/*  @Res() res: Response */) {
    const userId = req.user.sub;
    const result = await this.collectionService.findAllUserCollection(userId);

    return /* res.json( */{ message: 'Collection founded', result }/* ); */
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
    const result = this.collectionService.update(id, updateCollectionDto);
    return result
  }

  @Patch(':collectionId/items')
  @UseGuards(AuthGuard)
  async addItemsToCollection(
    @Param('collectionId') collectionId: string,
    @Body() body: { itemIds: string[] },
    @Req() req,
    @Res() res: Response
  ) {
    try {
      const userId = req.user.sub;
      if (!userId) {
        // @ts-ignore
        return res.status(401).json({ message: "Utilisateur non authentifié" });
      }

      const result = await this.collectionService.addItemsToCollection(collectionId, body, userId);

      // @ts-ignore
      return res.status(200).json({ message: "Items ajoutés avec succès", result });
    } catch (error) {
      console.error(error);
      // @ts-ignore
      return res.status(500).json({ message: "Erreur lors de l'ajout des items" });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.collectionService.remove(id);
    return result
  }
}
