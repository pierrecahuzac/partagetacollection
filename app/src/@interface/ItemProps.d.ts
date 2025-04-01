export interface ItemProps {
    id: string;
    name: string;
    description: string;
    isPublic?: boolean;
    createdAt?: string;
    quantity?: number;
    price?: number    
}