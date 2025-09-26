export interface UserProps {
    email: string,
    username: string,
    collections: CollectionProps[],
    role: {
        id: string,
        name: string
    },
    id: string,
    status: {
        id: string,
        name: string,
        description: string,
        order: 1,
        createdAt: string,
        updatedAt: string
    },
    likeItems: [],
    item: []

}