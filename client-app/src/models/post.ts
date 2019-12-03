import { IPostReply } from './postReply';
export interface Ipost {
    id: string;
    username: string;
    content: string;
    hasBeenEdited: boolean;
    date: Date;
    replies: IPostReply[]
}