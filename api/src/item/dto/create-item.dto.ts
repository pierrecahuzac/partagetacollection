export class CreateItemDto {
  name: string;
  description: string;
  price?: number;
  isPublic?: boolean;
  tags?: string[];
  collections?: string[];
  quantity?: number;
  barcode?: string;
}
