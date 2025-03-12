import { TagsProps } from "./TagsInterface";

export interface NewItemProps {
  name: string;
  description: string;
  isPublic: boolean;
  tags?: TagsProps[];
}
