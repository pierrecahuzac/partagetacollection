import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt, Min } from 'class-validator';

export class CreateCollectionStatusDto {
  @ApiProperty({ description: 'Nom du statut' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description du statut', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Ordre d\'affichage du statut', default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
