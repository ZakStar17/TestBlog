import React, { useState, FormEvent, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { IformPost } from "./../../../models/formPost";
import { v4 as uuid } from "uuid";
import { IPostReply } from "./../../../models/postReply";
import PostStore from "./../../../app/stores/postStore";
import { observer } from "mobx-react-lite";
import { Ipost } from "../../../models/post";

interface IProps {
  canCancel?: boolean;
  editMode?: boolean;
  post?: IformPost; //this can be either a post or a reply
  reply?: IPostReply;
  buttonText: string;
  belongsTo?: IformPost; // it will always belong to something if it's a reply
  mention?: string;
}

export const PostForm: React.FC<IProps> = ({
  canCancel,
  post,
  buttonText,
  editMode,
  belongsTo,
  reply,
  mention
}) => {
  const postStore = useContext(PostStore);
  const {
    target,
    submitting,
    updatePostServer,
    addPost,
    updatePostClient,
    addReply,
    updateReplyServer,
    updateReplyClient,
    updateTarget,
    setReplyMode,
    setEditMode
  } = postStore;

  const initializeFormContent = () => {
    let init;
    if (mention) init = "@" + mention + " ";
    else init = "";

    if (editMode) {
      if (reply) {
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
    let nPost: Ipost = {
      id: uuid(),
      username: "Me",
      content: content,
      hasBeenEdited: false,
      date: new Date(),
      replies: []
    };
    return nPost;
  };
  const newReply = (content: string) => {
    let nReply: IPostReply = {
      id: uuid(),
      username: "Me",
      content: content,
      hasBeenEdited: false,
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
          loading={
            ((post && target === post.id) ||
            (reply && target === reply.id) ||
              (target === "newComment" && !post)) &&
            submitting
          }
          content={buttonText}
          labelPosition="left"
          icon="edit"
          primary
          onClick={() => {
            if (!submitting) {  // button will not work on submitting
              if (virtualContent.length > 0) {
                if (editMode) { // save changes to the reply or the post
                  if (reply) {
                    updateReplyServer(reply, belongsTo!, virtualContent);
                  } else if (post) {
                    updateTarget(post.id);
                    updatePostServer(post, virtualContent);
                  }
                } else if (belongsTo && post) {
                  if (reply) {                // if replying from a reply
                    updateTarget(reply.id);
                    addReply(newReply(virtualContent), post).then(() => {
                      setReplyMode(reply, false);
                      updateReplyClient(reply, post);
                    })
                  } else {                    // if adding a new reply to one post
                    updateTarget(post.id);
                    addReply(newReply(virtualContent), post).then(() => {
                      setReplyMode(post, false);
                      updatePostClient(post);
                    });
                  }
                } else {
                  addPost(newPost(virtualContent));  // if adding a new post
                }
              }
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
              if (reply) {
                setReplyMode(reply, false);
                setEditMode(reply, false);
                updateReplyClient(reply, belongsTo!);
              } else if (post) {
                setReplyMode(post, false);
                setEditMode(post, false);
                updatePostClient(post);
              }
            }}
          />
        )}
      </Button.Group>
    </Form>
  );
};

export default observer(PostForm);
