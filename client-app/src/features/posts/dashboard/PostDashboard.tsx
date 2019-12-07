import React from "react";
import { Grid, Modal, Button } from "semantic-ui-react";
import { PostList } from "./PostList";
import { PostForm } from "../forms/PostForm";
import { IformPost } from "./../../../models/formPost";
import { IPostReply } from "../../../models/postReply";

interface IProps {
  posts: IformPost[];
  editPostClient: (post: IformPost) => void;
  editPostServer: (post: IformPost) => void;
  deletePost: (id: string) => void;
  addPost: (post: IformPost) => void;
  addReply: (reply: IPostReply, post: IformPost) => void;
  deleteReply: (replyId: string, post: IformPost) => void;
  editReply: (reply: IPostReply, post: IformPost) => void;
  submitting: boolean;
  target: string;
  updatePopup: (message: string) => void;
  popupMessage: string;
}

export const PostDashboard: React.FC<IProps> = ({
  posts,
  editPostClient,
  editPostServer,
  deletePost,
  addPost,
  addReply,
  deleteReply,
  editReply,
  submitting,
  target,
  updatePopup,
  popupMessage
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <PostForm
          editPostClient={editPostClient}
          editPostServer={editPostServer}
          buttonText={"Comment"}
          addPost={addPost}
          addReply={addReply}
          editReply={editReply}
          submitting={submitting}
          target={target}
        ></PostForm>
        <PostList
          posts={posts}
          editPostClient={editPostClient}
          editPostServer={editPostServer}
          deletePost={deletePost}
          addPost={addPost}
          addReply={addReply}
          deleteReply={deleteReply}
          editReply={editReply}
          submitting={submitting}
          target={target}
          updatePopup={updatePopup}
        />
        <Modal
          open={popupMessage.length > 0}
          closeOnDimmerClick={true}
          closeOnEscape={true}
          onClose={() => updatePopup("")}
        >
          <Modal.Header>
            Are you sure that you want to delete this commentary?
          </Modal.Header>
          <Modal.Content>"There is a commentary"</Modal.Content>
          <Modal.Actions>
            <Button onClick={() => updatePopup("")} positive>
              No
            </Button>
            <Button
              loading={submitting}
              onClick={() => {if (!submitting) deletePost(popupMessage)}}
              negative
              content="Yes"
            />
          </Modal.Actions>
        </Modal>
      </Grid.Column>
    </Grid>
  );
};
