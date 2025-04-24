export class CreateCollectionDto {
  title: string;
  description: string;
  isPublic: boolean;
  tags?: string[];
  startedAt?: string;
  cover?: string;
}
