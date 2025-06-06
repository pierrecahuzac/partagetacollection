// Types de base
export type ID = string;

// Enums
export enum ItemType {
  MUSIC = 'MUSIC',
  BOOK = 'BOOK',
  GAME = 'GAME',
  MOVIE = 'MOVIE',
}

export enum FormatType {
  CD = 'CD',
  VINYL = 'VINYL',
  DIGITAL = 'DIGITAL',
  PHYSICAL = 'PHYSICAL',
  EBOOK = 'EBOOK',
  HARDCOVER = 'HARDCOVER',
  PAPERBACK = 'PAPERBACK',
}

// Interfaces principales
export interface BaseEntity {
  id: ID;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  email: string;
  username: string | null;
  role: string;
}

export interface Item extends BaseEntity {
  name: string;
  creatorId: ID;
  description?: string | null;
  barcode?: string | null;
  formatTypeId?: ID | null;
  artist?: string | null;
  author?: string | null;
  cover?: string[];
  album?: string;
  year?: number;
  style?: string | null;
  publisher?: string | null;
  collection?: string | null;
  director?: string | null;
  platform?: string | null;
  genre?: string | null;
  developer?: string | null;
  formatType?: FormatType;
  isPublic: boolean;
  gameDeveloper?: string | null;
  type: ItemType;
}

export interface Collection extends BaseEntity {
  title: string;
  description: string;
  isPublic: boolean;
  tags?: string[];
  startedAt?: Date;
  cover?: string;
  userId: ID;
}

export interface CollectionItem extends BaseEntity {
  itemId: ID;
  collectionId: ID;
  userId: ID;
  condition: string;
  purchasePrice: number;
  notes: string;
  currency: string;
}

// DTOs
export interface CreateItemDto {
  name: string;
  creatorId: ID;
  description?: string | null;
  barcode?: string | null;
  formatTypeId?: ID | null;
  artist?: string | null;
  author?: string | null;
  cover?: string[];
  album?: string;
  year?: number;
  style?: string | null;
  publisher?: string | null;
  collection?: string | null;
  director?: string | null;
  platform?: string | null;
  genre?: string | null;
  developer?: string | null;
  formatType?: FormatType;
  isPublic?: boolean;
  gameDeveloper?: string | null;
  type: ItemType;
}

export interface CreateCollectionDto {
  title: string;
  description: string;
  isPublic: boolean;
  tags?: string[];
  startedAt?: Date;
  cover?: string;
}

export interface CreateCollectionItemDto {
  createItemId: ID;
  userId: ID;
  collectionId: ID;
  condition: string;
  purchasePrice: number;
  notes: string;
  currency: string;
}

// Types utilitaires
export type PartialEntity<T> = Partial<T>;
export type CreateDto<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateDto<T> = Partial<CreateDto<T>>; 