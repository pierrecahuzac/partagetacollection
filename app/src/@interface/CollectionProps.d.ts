import { ItemProps } from "./ItemProps";
import { TagsProps } from "./TagsInterface";
export default interface CollectionProps {
  id: string;
  name: string;
  userId: string;
  description: string;
  id: string;
  isPublic: boolean;
  title: string;
  updatedAt?: string;
  tags?: TagsProps[];
  cover?: string | undefined | any;
  images?: []
  startedAt?: Date | any;
  endingAt?: Date;
  createdAt?: Date | any;
  items: ItemProps[];
  collectionItems? :any

}
