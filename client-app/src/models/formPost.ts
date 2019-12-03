import { IPostReply } from './postReply';
export interface IformPost {
    id: string;
    username: string;
    content: string;
    hasBeenEdited: boolean;
    date: Date;
    replies: IPostReply[];
    isFormShowed: boolean;
    isInEditMode: boolean;
    isRepliesShowed: boolean;
}