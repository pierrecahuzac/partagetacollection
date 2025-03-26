import { TagsProps } from "./TagsInterface";

export interface NewItemProps {
  name: string;
  description: string;
  isPublic: boolean | any;
  formatType: string;
  formatTypeId: string;
  quantity: number;
  price: number;
  artist?: string;
  author?: ''
  cover?: string;
}
