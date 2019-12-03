export interface IPostReply {
    id: string;
    username: string;
    content: string;
    hasBeenEdited: boolean;
    date: Date;
    isFormShowed: boolean;
    isInEditMode: boolean;
}