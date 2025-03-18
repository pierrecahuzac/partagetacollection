import { TagsProps } from "./TagsInterface";

export interface NewItemProps {
  name: string;
  description: string;
  isPublic: boolean | any;
  tags?: TagsProps[] | any;
  quantity: number;
  price: string;
}
