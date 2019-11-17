import React from "react";
import { Comment } from "semantic-ui-react";
import { PostForm } from "./../forms/PostForm";
import { IformPost } from './../../../models/formPost';

interface IProps {
  posts: IformPost[];
  editPost: (post: IformPost) => void;
  deletePost: (id: string) => void;
  addPost: (post: IformPost) => void;
}

export const PostList: React.FC<IProps> = ({
  posts,
  editPost,
  deletePost,
  addPost
}) => {
  return (
    <Comment.Group>
      {posts.map(post => (
        <Comment key={post.id}>
          <Comment.Avatar as="a" src="/images/avatar/small/joe.jpg" />
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
            {(post.isFormShowed || post.isInEditMode) && (
              <PostForm
                canCancel
                editMode={post.isInEditMode}
                editPost={editPost}
                post={post}
                buttonText={"Reply"}
                addPost={addPost}
              />
            )}
          </Comment.Content>
        </Comment>
      ))}
    </Comment.Group>
  );
};
