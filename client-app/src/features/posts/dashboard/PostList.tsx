import React from "react";
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
          <Comment.Avatar as="a" src="./../../../../public/default user icon.jpg" />
          <Comment.Content>
            <Comment.Author>{post.username}</Comment.Author>
            <Comment.Metadata>
              <div>{String(post.date)}</div>
            </Comment.Metadata>
            {!post.isInEditMode && <Comment.Text>{post.content}</Comment.Text>}
            {!post.isInEditMode && (
              <Comment.Actions>
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
              </Comment.Actions>
            )}
            {(post.isFormShowed) && (
              <PostForm
                canCancel
                editMode={false}
                editPost={editPost}
                post={post}
                buttonText={"Reply"}
                addPost={addPost}
                belongsTo={post}
                addReply={addReply}
                editReply={editReply}
                reply={null}
                mention={null}
              />
            )}
            {(post.isInEditMode) && (
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
                reply={null}
                mention={null}
              />
            )}
          </Comment.Content>
          <Comment.Group>
            <ReplyList
              replies={post.replies}
              deleteReply={deleteReply}
              belongsTo={post}
              editReply={editReply}
              addReply={addReply}
              addPost={addPost}
            ></ReplyList>
          </Comment.Group>
        </Comment>
      ))}
    </Comment.Group>
  );
};
