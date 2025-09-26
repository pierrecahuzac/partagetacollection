interface ItemProps {
    id: string;
    name: string;
    title: string;
    description: string;
    condition: string;
    barcode: string | null;
    images: Array<{ url: string, isCover: boolean, id: string }>;
    album: string;
    artist: string;
    author: string;
    director: string;
    gameDeveloper: string;
    gameEditor: string;
    genre: string;
    isbn: string;
    language: string;
    platform: string;
    videoEditor: string;
    denomination: string;
    likeItems: string;
    material: string;
    audioDuration: string;
    country: string;
    collection: string;
    isPublic: boolean;
    videoDuration: string;
    formatTypeId: string;
    publisher: string;
    style: string;
    year: string;
    collections: string;
    creatorId: string;
    likes: Array<any>;
    formatType?: { name: string };
}

export default ItemProps;
