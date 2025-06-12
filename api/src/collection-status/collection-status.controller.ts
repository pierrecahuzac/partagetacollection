import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CollectionStatusService } from './collection-status.service';
import { CreateCollectionStatusDto } from './dto/create-collection-status.dto';
import { UpdateCollectionStatusDto } from './dto/update-collection-status.dto';
import { CollectionStatus } from './entities/collection-status.entity';

@ApiTags('collection-status')
@Controller('/api/collection-status')
export class CollectionStatusController {
  constructor(private readonly collectionStatusService: CollectionStatusService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau statut de collection' })
  @ApiResponse({ status: 201, description: 'Le statut a été créé avec succès.', type: CollectionStatus })
  create(@Body() createCollectionStatusDto: CreateCollectionStatusDto) {
    return this.collectionStatusService.create(createCollectionStatusDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les statuts de collection' })
  @ApiResponse({ status: 200, description: 'Liste des statuts récupérée avec succès.', type: [CollectionStatus] })
  findAll() {
 
    return this.collectionStatusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un statut de collection par son ID' })
  @ApiResponse({ status: 200, description: 'Le statut a été trouvé.', type: CollectionStatus })
  findOne(@Param('id') id: string) {
    return this.collectionStatusService.findOne(id);
  }
  @Get()
 

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un statut de collection' })
  @ApiResponse({ status: 200, description: 'Le statut a été mis à jour avec succès.', type: CollectionStatus })
  update(@Param('id') id: string, @Body() updateCollectionStatusDto: UpdateCollectionStatusDto) {
    return this.collectionStatusService.update(id, updateCollectionStatusDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un statut de collection' })
  @ApiResponse({ status: 200, description: 'Le statut a été supprimé avec succès.' })
  remove(@Param('id') id: string) {
    return this.collectionStatusService.remove(id);
  }
}
