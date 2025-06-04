export class CreateItemDto {
  name: string;
  creatorId: string;
  description?: string | null;
  barcode?: string | null;
  formatTypeId?: string | null;
  artist?: string | null;
  author?: string | null;
  cover?: string[];  
  album?: string;
  year?: any;
  style?: string | null;
  publisher?: string | null;
  collection?: string | null;
  director?: string | null;
  platform?: string | null;
  genre?: string | null;
  developer?: string | null;
  formatType?: any;
  isPublic?: boolean;  
  gameDeveloper?: string | null
}