export class CreateItemDto {
  name: string;
  description: string;
  price?: number;
  isPublic?: boolean;
  
  quantity?: number;
  barcode?: string;
  formatTypeId? :string
  cover? : string;
  currency?: string |any
  }
