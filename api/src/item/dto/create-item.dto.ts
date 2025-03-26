export class CreateItemDto {
  name: string;
  description: string;
  price?: number;
  isPublic?: boolean;
  collections?: string[];
  quantity?: number;
  barcode?: string;
  formatTypeId? :string
  
}
