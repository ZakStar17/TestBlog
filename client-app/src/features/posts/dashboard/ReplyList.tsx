import React, { Fragment, useContext } from "react";
import { Comment } from "semantic-ui-react";
import { PostForm } from "./../forms/PostForm";
import { IformPost } from "../../../models/formPost";
import { observer } from "mobx-react-lite";
import PostStore from "./../../../app/stores/postStore";

interface IProps {
  post: IformPost;
}

export const ReplyList: React.FC<IProps> = ({ post }) => {
  const postStore = useContext(PostStore);
  const { updateReplyClient, updateReplyDeletePopup, setEditMode, setReplyMode} = postStore;
  return (
    <Fragment>
      {Array.from(post.replies.values()).map(reply => (
        <Comment key={reply.id}>
          <Comment.Avatar as="a" src=".\abc.jpg" />
          <Comment.Content>
            <Comment.Author>{reply.username}</Comment.Author>
            <Comment.Metadata>
              <div>{String(reply.date)}</div>
              {reply.hasBeenEdited && <div>edited</div>}
            </Comment.Metadata>
            {!reply.isInEditMode && (
              <Comment.Text>{reply.content}</Comment.Text>
            )}
            {!reply.isInEditMode && (
              <Comment.Actions>
                <Comment.Action
                  onClick={() => {
                    setReplyMode(reply);
                    updateReplyClient(reply, post);
                  }}
                >
                  Reply
                </Comment.Action>
                <Comment.Action
                  onClick={() => {
                    setEditMode(reply);
                    updateReplyClient(reply, post);
                  }}
                >
                  Edit
                </Comment.Action>
                <Comment.Action
                  onClick={() => updateReplyDeletePopup([reply, post])}
                >
                  Delete
                </Comment.Action>
              </Comment.Actions>
            )}
            {reply.isInEditMode && (
              <PostForm
                canCancel
                editMode
                reply={reply}
                buttonText={"Edit"}
                belongsTo={post}
              />
            )}
            {reply.isFormShowed && (
              <PostForm
                canCancel
                post={post}
                buttonText={"Reply"}
                belongsTo={post}
                reply={reply}
                mention={reply.username}
              />
            )}
          </Comment.Content>
        </Comment>
      ))}
    </Fragment>
  );
};

export default observer(ReplyList);
