import React, { Fragment } from "react";
import { Comment } from "semantic-ui-react";
import { PostForm } from "./../forms/PostForm";
import { IformPost } from "./../../../models/formPost";
import { ReplyList } from "./ReplyList";
import { IPostReply } from "../../../models/postReply";

interface IProps {
  posts: IformPost[];
  editPost: (post: IformPost) => void;
  deletePost: (id: string) => void;
  addPost: (post: IformPost) => void;
  addReply: (reply: IPostReply, post: IformPost) => void;
  deleteReply: (replyId: string, post: IformPost) => void;
  editReply: (reply: IPostReply, post: IformPost) => void;
}

export const PostList: React.FC<IProps> = ({
  posts,
  editPost,
  deletePost,
  addPost,
  addReply,
  deleteReply,
  editReply
}) => {
  return (
    <Comment.Group>
      {posts.map(post => (
        <Comment key={post.id}>
          <Comment.Avatar as="a" src=".\abc.jpg" />
          <Comment.Content>
            <Comment.Author>{post.username}</Comment.Author>
            <Comment.Metadata>
              <div>{String(post.date)}</div>
              {post.hasBeenEdited && <div>edited</div>}
            </Comment.Metadata>
            {!post.isInEditMode && <Comment.Text>{post.content}</Comment.Text>}
            <Comment.Actions>
              {!post.isInEditMode && (
                <Fragment>
                  <Comment.Action
                    onClick={() => {
                      post.isFormShowed = true;
                      editPost(post);
                    }}
                  >
                    Reply
                  </Comment.Action>
                  <Comment.Action
                    onClick={() => {
                      post.isInEditMode = true;
                      editPost(post);
                    }}
                  >
                    Edit
                  </Comment.Action>
                  <Comment.Action onClick={() => deletePost(post.id)}>
                    Delete
                  </Comment.Action>
                </Fragment>
              )}
              {!post.isRepliesShowed && post.replies.length > 0 && (
                <Comment.Action
                  onClick={() => {
                    post.isRepliesShowed = true;
                    editPost(post);
                  }}
                >
                  Show {post.replies.length} Replies
                </Comment.Action>
              )}
              {post.isRepliesShowed && (
                <Comment.Action
                  onClick={() => {
                    post.isRepliesShowed = false;
                    editPost(post);
                  }}
                >
                  Hide Replies
                </Comment.Action>
              )}
            </Comment.Actions>

            {post.isFormShowed && (
              <PostForm
                canCancel
                editPost={editPost}
                post={post}
                buttonText={"Reply"}
                addPost={addPost}
                belongsTo={post}
                addReply={addReply}
                editReply={editReply}
              />
            )}
            {post.isInEditMode && (
              <PostForm
                canCancel
                editMode
                editPost={editPost}
                post={post}
                buttonText={"Edit"}
                addPost={addPost}
                belongsTo={post}
                addReply={addReply}
                editReply={editReply}
              />
            )}
          </Comment.Content>
          <Comment.Group>
            {post.isRepliesShowed && (
              <ReplyList
                replies={post.replies}
                deleteReply={deleteReply}
                belongsTo={post}
                editReply={editReply}
                addReply={addReply}
                addPost={addPost}
              ></ReplyList>
            )}
          </Comment.Group>
        </Comment>
      ))}
    </Comment.Group>
  );
};
