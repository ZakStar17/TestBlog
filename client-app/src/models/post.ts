import { IPostReply } from './postReply';
export interface Ipost {
    id: string;
    username: string;
    content: string;
    date: Date;
    replies: IPostReply[]
}