export interface ItemProps {
    id: string;
    name: string;
    title: string;
    description: string;
    createdAt?: string;
    quantity?: number;
    price?: number,
    images: any,
    currency?: string,
    condition?: string
    barcode?: null | number | string
    ,
    images?: []
}