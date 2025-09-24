import { ItemProps } from "./ItemProps";
import { TagsProps } from "./TagsInterface";
export default interface CollectionProps {
  id: string;
  name: string;
  userId: string;
  description: string;
  isPublic: boolean;
  title: string;
  updatedAt?: string;
  tags?: TagsProps[];
  cover?: string;
  images?: ImageProps[];
  startedAt?: string;
  endingAt?: string;
  createdAt?: string;
  items: ItemProps[];
  collectionItems?: Array<{ id: string; itemId: string; collectionId: string; purchasePrice: string; condition: string; notes: string; }>;
  visibility?: { id: string; name: string; description: string; };
  status?: { id: string; name: string; description: string; };
  createdAt?:Date
}
