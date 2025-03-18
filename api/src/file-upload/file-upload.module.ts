import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';
// import { CollectionController } from 'src/collection/collection.controller';
import { CollectionService } from 'src/collection/collection.service';
import { ne } from '@faker-js/faker/.';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {          
          const newFileName = `${Date.now()}-${file.originalname}`;

          console.log("newFileName",newFileName);          
          cb(null, newFileName);
        },
      }),
    }),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService, CollectionService],
})
export class FileUploadModule {}
