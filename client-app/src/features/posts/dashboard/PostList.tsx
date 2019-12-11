import React, { Fragment, useContext } from "react";
import { Comment } from "semantic-ui-react";
import { PostForm } from "./../forms/PostForm";
import { ReplyList } from "./ReplyList";
import PostStore from "./../../../app/stores/postStore";
import { observer } from "mobx-react-lite";


export const PostList: React.FC = () => {
  const postStore = useContext(PostStore);
  const {postsByDate, updatePostClient, updatePostDeletePopup, setReplyMode, setEditMode, showReplies} = postStore;
  return (
    <Comment.Group>
      {postsByDate.map(post => (
        <Comment key={post.id}>
          <Comment.Avatar as="a" src=".\abc.jpg" />
          <Comment.Content>
            <Comment.Author>{post.username}</Comment.Author>
            <Comment.Metadata>
              <div>{post.date}</div>
             <div>{post.hasBeenEdited && "edited"}</div>
            </Comment.Metadata>
            {!post.isInEditMode && <Comment.Text>{post.content}</Comment.Text>}
            <Comment.Actions>
              {!post.isInEditMode && (
                <Fragment>
                  <Comment.Action
                    onClick={() => {
                      setReplyMode(post);
                      updatePostClient(post);
                    }}
                  >
                    Reply
                  </Comment.Action>
                  <Comment.Action
                    onClick={() => {
                      setEditMode(post);
                      updatePostClient(post);
                    }}
                  >
                    Edit
                  </Comment.Action>
                  <Comment.Action
                    onClick={() => updatePostDeletePopup(post)}
                  >
                    Delete
                  </Comment.Action>
                </Fragment>
              )}
              {!post.isRepliesShowed && post.replies.size > 0 && (
                <Comment.Action
                  onClick={() => {
                    showReplies(post);
                    updatePostClient(post);
                  }}
                >
                  Show {post.replies.size} Replies
                </Comment.Action>
              )}
              {post.isRepliesShowed && (
                <Comment.Action
                  onClick={() => {
                    showReplies(post, false);
                    updatePostClient(post);
                  }}
                >
                  Hide Replies
                </Comment.Action>
              )}
            </Comment.Actions>

            {post.isFormShowed && (
              <PostForm
                canCancel
                post={post}
                buttonText={"Reply"}
                belongsTo={post}
              />
            )}
            {post.isInEditMode && (
              <PostForm
                canCancel
                editMode
                post={post}
                buttonText={"Edit"}
                belongsTo={post}
              />
            )}
          </Comment.Content>
          <Comment.Group>
            {post.isRepliesShowed && (
              <ReplyList
                post={post}
              ></ReplyList>
            )}
          </Comment.Group>
        </Comment>
      ))}
    </Comment.Group>
  );
};

export default observer(PostList);
