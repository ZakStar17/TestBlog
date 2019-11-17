import React, { useState, FormEvent } from "react";
import { Form, Button } from "semantic-ui-react";
import { IformPost } from "./../../../models/formPost";
import { v4 as uuid } from "uuid";
import { IPostReply } from './../../../models/postReply';

interface IProps {
  canCancel: boolean;
  editMode: boolean;
  editPost: (post: IformPost) => void;
  post?: IformPost;
  buttonText: string;
  addPost: (post: IformPost) => void;
}

export const PostForm: React.FC<IProps> = ({
  canCancel,
  editPost,
  post,
  buttonText,
  editMode,
  addPost
}) => {
  const initializeFormContent = () => {
    if (editMode) {
      return post!.content;
    } else {
      return "";
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
            if (editMode) {
              post!.isFormShowed = false;
              post!.isInEditMode = false;
              post!.content = virtualContent;
              editPost(post!);
            } else if (virtualContent.length > 0) {
              addPost(newPost(virtualContent));
              setVirtualContent("");
            }
          }}
        />
        {canCancel && (
          <Button
            content="Cancel"
            labelPosition="left"
            icon="delete"
            color="grey"
            onClick={() => {
              post!.isFormShowed = false;
              post!.isInEditMode = false;
              editPost(post!);
            }}
          />
        )}
      </Button.Group>
    </Form>
  );
};
