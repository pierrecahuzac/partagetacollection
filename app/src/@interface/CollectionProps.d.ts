import { TagsProps } from "./TagsInterface";
export default interface CollectionProps {
  id: number;
  name: string;
  userId: string;
  description: string;
  id: string;
  isPublic: booelan;
  tags: TagsProps[];
  title: string;
  updatedAt?: string;
  tags?: TagsProps[];
  imageURL?: string;
  startingAt?: Date |any;
  endingAt?: Date;
  createdAt?: string;
}
