import ImageProps from "./ImageProps";

export default interface ItemWithCollectionDetailsProps {
    // Propriétés de CollectionItem
    collectionItemId: string; // Renommé pour éviter le conflit avec ItemProps.id
    collectionId: string;
    userId: string;
    status: string; // Statut de l'item dans la collection (ex: "possédé", "vendu")
    itemCreatedAt: string; // Date de création dans la collection (renommée)
    itemUpdatedAt: string; // Date de mise à jour dans la collection (renommée)

    // Propriétés de ItemProps fusionnées
    id: string; // L'id de l'item réel
    name: string;
    title: string;
    description: string;
    creatorId: string;
    images?: ImageProps[];
    cover?: string;
    isPublic?: boolean;
    createdAt?: string; // Date de création de l'item réel
    updatedAt?: string; // Date de mise à jour de l'item réel
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
    collection?: string; // Nom de la collection liée (à confirmer)
    videoDuration?: string;
    formatTypeId?: string;
    publisher?: string;
    style?: string;
    year?: string;
    collections?: string; // Peut-être un tableau de collections ? (à confirmer)

    // Propriétés spécifiques à CollectionItem (pricePaid et currency)
    pricePaid?: string;
    currency?: string;
}
