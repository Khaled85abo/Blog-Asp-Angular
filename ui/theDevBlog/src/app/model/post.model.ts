export interface Post {
    id: string;
    title: string;
    content: string;
    summary: string;
    author: string;
    urlHandle: string;
    visible: boolean;
    publishedDate: Date;
    updatedDate: Date;
    featuredImageUrl: string;
}