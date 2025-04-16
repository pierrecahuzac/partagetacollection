import { TagsProps } from "./TagsInterface";

export interface NewCollectionProps {
  title: string;
  description: string;
  collectionStatus: string,
  title: string;
  tags?: TagsProps[];
  cover?: string;
  startedAt: string | number | readonly string[] | undefined
}
