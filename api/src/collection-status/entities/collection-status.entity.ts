import { ApiProperty } from '@nestjs/swagger';

export class CollectionStatus {
  @ApiProperty({ description: 'Identifiant unique du statut' })
  id: string;

  @ApiProperty({ description: 'Nom du statut' })
  name: string;

  @ApiProperty({ description: 'Description du statut', required: false })
  description?: string;

  @ApiProperty({ description: 'Ordre d\'affichage du statut' })
  order: number;

  @ApiProperty({ description: 'Date de création' })
  createdAt: Date;

  @ApiProperty({ description: 'Date de mise à jour' })
  updatedAt: Date;
}
