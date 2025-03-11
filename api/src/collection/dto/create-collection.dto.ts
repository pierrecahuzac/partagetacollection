export class CreateCollectionDto {
  title: string;
  description: string;
  //id: string;
  userId: string;
  isPublic: boolean;
  tags?: string[];
}
