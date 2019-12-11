import { IPostReply } from './postReply';
export interface IformPost {
    id: string;
    username: string;
    content: string;
    hasBeenEdited: boolean;
    date: string;
    replies: Map<string, IPostReply>;
    isFormShowed: boolean;
    isInEditMode: boolean;
    isRepliesShowed: boolean;
}