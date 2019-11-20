import React, { useState, FormEvent } from "react";
import { Form, Button } from "semantic-ui-react";
import { IformPost } from "./../../../models/formPost";
import { v4 as uuid } from "uuid";
import { IPostReply } from "./../../../models/postReply";

interface IProps {
  canCancel: boolean;
  editMode: boolean;
  editPost?: (post: IformPost) => void;
  post?: IformPost; //this can be either a post or a reply
  reply: IPostReply | null;
  buttonText: string;
  addPost?: (post: IformPost) => void;
  belongsTo: IformPost | null; // it will always belong to something if it's a reply
  addReply: (reply: IPostReply, post: IformPost) => void;
  editReply: (reply: IPostReply, post: IformPost) => void;
  mention: string | null;
}

export const PostForm: React.FC<IProps> = ({
  canCancel,
  editPost,
  post,
  buttonText,
  editMode,
  addPost,
  belongsTo,
  addReply,
  editReply,
  reply,
  mention
}) => {
  const initializeFormContent = () => {
    let init;
    if (mention !== null) init = "@" + mention + " ";
    else init = "";

    if (editMode) {
      if (reply !== null) {
        return init + reply.content;
      }
      return init + post!.content;
    } else {
      return init;
    }
  };

  const [virtualContent, setVirtualContent] = useState(initializeFormContent);

  const handleInputChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setVirtualContent(event.currentTarget.value);
  };

  const newPost = (content: string) => {
    let nPost: IformPost = {
      id: uuid(),
      username: "Me",
      content: content,
      date: new Date(),
      replies: [],
      isFormShowed: false,
      isInEditMode: false
    };
    return nPost;
  };
  const newReply = (content: string) => {
    let nReply: IPostReply = {
      id: uuid(),
      username: "Me",
      content: content,
      date: new Date(),
      isFormShowed: false,
      isInEditMode: false
    };
    return nReply;
  };

  return (
    <Form reply>
      <Form.TextArea onChange={handleInputChange} value={virtualContent} />
      <Button.Group>
        <Button
          content={buttonText}
          labelPosition="left"
          icon="edit"
          primary
          onClick={() => {
            if (virtualContent.length > 0) {
              if (editMode) {
                if (reply !== null) {
                  reply!.isFormShowed = false;
                  reply!.isInEditMode = false;
                  reply!.content = virtualContent;
                  editReply(reply!, belongsTo!);
                } else {
                  post!.isFormShowed = false;
                  post!.isInEditMode = false;
                  post!.content = virtualContent;
                  editPost!(post!);
                }
              } else if (belongsTo !== null) {
                if (reply !== null) {
                  reply.isFormShowed = false;
                  editReply(reply, post!);
                } else {
                  post!.isFormShowed = false;
                }

                addReply(newReply(virtualContent), post!);
              } else {
                addPost!(newPost(virtualContent));
              }
            }
            setVirtualContent("");
          }}
        />
        {canCancel && (
          <Button
            content="Cancel"
            labelPosition="left"
            icon="delete"
            color="grey"
            onClick={() => {
              if (reply !== null) {
                reply.isFormShowed = false;
                reply.isInEditMode = false;
                editReply(reply, belongsTo!);
              } else {
                post!.isFormShowed = false;
                post!.isInEditMode = false;
                editPost!(post!);
              }
            }}
          />
        )}
      </Button.Group>
    </Form>
  );
};
