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

export interface IPagination {
    page: number;
    size: number;
    total_pages: number;
}

export interface ICommentsRequest {
    pagination: IPagination;
    data: IComment[];
}