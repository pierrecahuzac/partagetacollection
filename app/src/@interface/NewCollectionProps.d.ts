import { TagsProps } from "./TagsInterface";

export interface NewCollectionProps {
  title: string;
  description: string;
  isPublic: boolean;
  title: string;
  tags?: TagsProps[];
  cover?: string;
  startedAt: string | number | readonly string[] | undefined
}
