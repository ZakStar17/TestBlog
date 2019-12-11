import React, { useContext } from "react";
import { Grid, Modal, Button } from "semantic-ui-react";
import { PostList } from "./PostList";
import { PostForm } from "../forms/PostForm";
import PostStore from "./../../../app/stores/postStore";
import { observer } from "mobx-react-lite";

export const PostDashboard: React.FC = () => {
  const postStore = useContext(PostStore);
  const {
    submitting,
    postDeletePopup,
    updatePostDeletePopup,
    replyDeletePopup,
    updateReplyDeletePopup,
    deletePost,
    deleteReply
  } = postStore;

  return (
    <Grid>
      <Grid.Column width={10}>
        <PostForm buttonText={"Comment"}></PostForm>
        <PostList />
        {postDeletePopup !== null && (
          <Modal
            open={postDeletePopup !== null}
            closeOnDimmerClick
            closeOnEscape
            onClose={() => updatePostDeletePopup(null)}
          >
            <Modal.Header>
              Are you sure that you want to delete this commentary?
            </Modal.Header>
            <Modal.Content>
              {postDeletePopup && postDeletePopup.content}
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => updatePostDeletePopup(null)} positive>
                No
              </Button>
              <Button
                loading={submitting}
                onClick={() => {
                  if (!submitting)
                    deletePost(postDeletePopup.id);
                }}
                negative
                content="Yes"
              />
            </Modal.Actions>
          </Modal>
        )}
        {replyDeletePopup !== null && (
          <Modal
            open={replyDeletePopup !== null}
            closeOnDimmerClick
            closeOnEscape
            onClose={() => updateReplyDeletePopup(null)}
          >
            <Modal.Header>
              Are you sure that you want to delete this commentary?
            </Modal.Header>
            <Modal.Content>
              {replyDeletePopup && replyDeletePopup[0].content}
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => updateReplyDeletePopup(null)} positive>
                No
              </Button>
              <Button
                loading={submitting}
                onClick={() => {
                  if (!submitting)
                    deleteReply(replyDeletePopup[0].id, replyDeletePopup[1]);
                }}
                negative
                content="Yes"
              />
            </Modal.Actions>
          </Modal>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(PostDashboard);
