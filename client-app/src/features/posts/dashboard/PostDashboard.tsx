import React from "react";
import { Grid } from "semantic-ui-react";
import { PostList } from "./PostList";
import { PostForm } from "../forms/PostForm";
import { IformPost } from './../../../models/formPost';
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

export const PostDashboard: React.FC<IProps> = ({
  posts,
  editPost,
  deletePost,
  addPost,
  addReply,
  deleteReply,
  editReply
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <PostForm
          editPost={editPost}
          buttonText={"Comment"}
          addPost={addPost}
          addReply={addReply}
          editReply={editReply}
        ></PostForm>
        <PostList
          posts={posts}
          editPost={editPost}
          deletePost={deletePost}
          addPost={addPost}
          addReply={addReply}
          deleteReply={deleteReply}
          editReply={editReply}
        />
      </Grid.Column>
    </Grid>
  );
};
