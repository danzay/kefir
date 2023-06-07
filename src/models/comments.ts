export interface IComment {
    author: number,
    created: string,
    id: number,
    likes: number,
    parent: number | null,
    children: IComment[],
    text: string,
    authorData: IAuthor
}

export interface IAuthor {
    id: number,
    name: string,
    avatar: string
}