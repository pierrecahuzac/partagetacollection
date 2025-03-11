import { TagsProps } from "./TagsInterface";

export interface NewCollectionProps {
  name: string;
  description: string;
  isPublic: boolean;
  title:string
  tags?: TagsProps[];
}
