export default interface ItemProps {
    images?: any,
    isPublic?: boolean,
    id?: string,
    creatorId?: string,
    item: {
        id: string;
        name: string;
        title: string;
        description: string;
        createdAt?: string;
        quantity?: number;
        price?: number,
        images?: any,
        creatorId: string,
        condition?: string
        barcode?: null | number | string,
        updatedAt?: string,
        formatType?: {
            name: string;
        },
        album?: string,
        artist?: string,
        author?: string,
        director?: string,
        gameDeveloper?: string,
        gameEditor?: string,
        genre?: string,
        isbn?: string,
        language?: string,
        platform?: string,
        videoEditor?: string,
        denomination?: string,
        likeItems?: string,
        material?: string,
        audioDuration?: string,
        country?: string,
        collection?: string,
        isPublic?: string,
        price?: string,
        quantity?: string,
        videoDuration?: string,
        formatTypeId?: string,
        publisher?: string,
        style?: string,
        year?: string,
        images?: string,
        collections?: string
        images?: []
    }

}