import React from "react";
import { Grid } from "semantic-ui-react";
import { PostList } from "./PostList";
import { PostForm } from "../forms/PostForm";
import { IformPost } from './../../../models/formPost';

interface IProps {
  posts: IformPost[];
  editPost: (post: IformPost) => void;
  deletePost: (id: string) => void;
  addPost: (post: IformPost) => void;
}

export const PostDashboard: React.FC<IProps> = ({
  posts,
  editPost,
  deletePost,
  addPost
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <PostForm
          canCancel={false}
          editPost={editPost}
          buttonText={"Comment"}
          editMode={false}
          addPost={addPost}
        ></PostForm>
        <PostList
          posts={posts}
          editPost={editPost}
          deletePost={deletePost}
          addPost={addPost}
        />
      </Grid.Column>
    </Grid>
  );
};
