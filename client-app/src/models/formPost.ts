import { IPostReply } from './postReply';
export interface IformPost {
    id: string;
    username: string;
    content: string;
    date: Date;
    replies: IPostReply[];
    isFormShowed: boolean;
    isInEditMode: boolean;
}