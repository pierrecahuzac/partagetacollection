import ImageProps from "./ImageProps";

export default interface ItemProps {
    id: string;
    name: string;
    title: string;
    description: string;
    creatorId: string;
    images?: ImageProps[];
    cover?: string;
    isPublic?: boolean;
    createdAt?: string;
    updatedAt?: string;
    quantity?: number;
    price?: number;
    barcode?: null | number | string;
    condition?: string;
    formatType?: {
        name: string;
    };
    album?: string;
    artist?: string;
    author?: string;
    director?: string;
    gameDeveloper?: string;
    gameEditor?: string;
    genre?: string;
    isbn?: string;
    language?: string;
    platform?: string;
    videoEditor?: string;
    denomination?: string;
    likeItems?: string;
    material?: string;
    audioDuration?: string;
    country?: string;
    collection?: string;
    videoDuration?: string;
    formatTypeId?: string;
    publisher?: string;
    style?: string;
    year?: string;
    collections?: string;
}