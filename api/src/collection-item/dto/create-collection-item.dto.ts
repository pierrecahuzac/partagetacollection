import { CreateCollectionItemDto as ICreateCollectionItemDto } from '../../types';

export class CreateCollectionItemDto implements ICreateCollectionItemDto {
    createItemId: string;
    userId: string;
    collectionId: string;
    condition: string;
    purchasePrice: number;
    notes: string;
    currency: string;
}
