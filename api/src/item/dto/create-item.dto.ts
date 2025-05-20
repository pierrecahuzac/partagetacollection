export class CreateItemDto {
  name: string;
  description?: string;
  price?: number;
  quantity?: number;
  barcode?: string;
  formatTypeId?: string;
  currency?: string;
  artist?: string;
  author?: string;
  cover?: string[];  // Add this line
}