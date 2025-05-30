import { TagsProps } from "./TagsInterface";

/* export interface NewItemProps {
  name: string;
  description: string;
  isPublic: boolean | any;
  formatType: string;
  formatTypeId: string;
  quantity: number;
  price: number;
  artist?: string;
  author?: ''
  cover?: string[]| [];
  currency?: string
  collectionToAddItem?: string;
  barcode? : null | number | string |any
}
 */

export interface NewItemProps {
  name: string;
  description: string;
  formatType: string;
  formatTypeId: string;
  isPublic: boolean;
  quantity: number;
  price: number;
  artist: string;
  album: string;
  year: string;
  style: string;
  author: string;
  publisher: string; // Utile pour les livres, comics, et jeux vidéo
  collection: string;
  director: string;
  actors: string;
  platform: string; // Nouveau pour les jeux vidéo
  genre: string;    // Nouveau pour les jeux vidéo
  developer: string; // Nouveau pour les jeux vidéo
  barcode: string;
  cover: string[];
  currency: string;
}