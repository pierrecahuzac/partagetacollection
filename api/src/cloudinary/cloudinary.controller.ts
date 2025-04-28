import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CreateCloudinaryDto } from './dto/create-cloudinary.dto';
import { UpdateCloudinaryDto } from './dto/update-cloudinary.dto';
import { v2 as cloudinary } from 'cloudinary';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  create(@Body() createCloudinaryDto: CreateCloudinaryDto) {

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dpdvxtp26', 
        api_key: '314581176827293', 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();
    return this.cloudinaryService.create(createCloudinaryDto);
  }

  @Get()
  findAll() {
    return this.cloudinaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cloudinaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCloudinaryDto: UpdateCloudinaryDto) {
    return this.cloudinaryService.update(+id, updateCloudinaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cloudinaryService.remove(+id);
  }
}
