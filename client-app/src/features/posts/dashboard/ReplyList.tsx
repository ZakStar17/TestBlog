import React, { Fragment } from "react";
import { IPostReply } from "../../../models/postReply";
import { Comment } from "semantic-ui-react";
import { PostForm } from "./../forms/PostForm";
import { IformPost } from "../../../models/formPost";

interface IProps {
  replies: IPostReply[];
  deleteReply: (replyId: string, post: IformPost) => void;
  belongsTo: IformPost;
  editReply: (reply: IPostReply, post: IformPost) => void;
  addReply: (reply: IPostReply, post: IformPost) => void;
  addPost: (post: IformPost) => void;
}

export const ReplyList: React.FC<IProps> = ({
  replies,
  belongsTo,
  deleteReply,
  editReply,
  addReply,
  addPost
}) => {
  return (
    <Fragment>
      {replies.map(reply => (
        <Comment key={reply.id}>
          <Comment.Avatar as="a" src=".\abc.jpg" />
          <Comment.Content>
            <Comment.Author>{reply.username}</Comment.Author>
            <Comment.Metadata>
              <div>{String(reply.date)}</div>
              {(reply.hasBeenEdited) && <div>edited</div>}
            </Comment.Metadata>
            {!reply.isInEditMode && (
              <Comment.Text>{reply.content}</Comment.Text>
            )}
            {!reply.isInEditMode && (
              <Comment.Actions>
                <Comment.Action
                  onClick={() => {
                    reply.isFormShowed = true;
                    editReply(reply, belongsTo);
                  }}
                >
                  Reply
                </Comment.Action>
                <Comment.Action
                  onClick={() => {
                    reply.isInEditMode = true;
                    editReply(reply, belongsTo);
                  }}
                >
                  Edit
                </Comment.Action>
                <Comment.Action
                  onClick={() => deleteReply(reply.id, belongsTo)}
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
                belongsTo={belongsTo}
                editReply={editReply}
                addReply={addReply}
              />
            )}
            {reply.isFormShowed && (
              <PostForm
                canCancel
                post={belongsTo}
                buttonText={"Reply"}
                addPost={addPost}
                belongsTo={belongsTo}
                addReply={addReply}
                editReply={editReply}
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
