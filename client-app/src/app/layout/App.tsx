import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { PostDashboard } from "../../features/posts/dashboard/PostDashboard";
import { IformPost } from "./../../models/formPost";
import { IPostReply } from "../../models/postReply";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";

const App = () => {
  const [posts, setPosts] = useState<IformPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const handleUpdatePopup = (message: string) => {
    setPopupMessage(message);
  };

  const handleUpdatePostClient = (post: IformPost) => {
    setPosts([...posts]);
  };

  const handleUpdatePostServer = (
    post: IformPost,
    newTarget: string | null = null
  ) => {
    setSubmitting(true);
    if (newTarget) setTarget(newTarget);
    agent.Posts.update(post)
      .then(() => {
        post.isFormShowed = false;
        post.isInEditMode = false;
        setPosts([...posts]);
      })
      .then(() => setSubmitting(false));
  };

  const handleAddPost = (post: IformPost) => {
    setSubmitting(true);
    setTarget("newComment");
    agent.Posts.create(post)
      .then(() => {
        setPosts([post, ...posts]);
      })
      .then(() => setSubmitting(false));
  };

  const handleDeletePost = (id: string) => {
    setSubmitting(true);
    setTarget("");
    agent.Posts.delete(id).then(() => {
      setPosts([...posts.filter(p => p.id !== id)]);
      setSubmitting(false);
      setPopupMessage("");
    });
  };

  const handleUpdateReply = (reply: IPostReply, post: IformPost) => {
    let updatedReplies: IPostReply[] = [];
    post.replies.map(otherReply => {
      if (otherReply.id === reply.id) updatedReplies.push(reply);
      else updatedReplies.push(otherReply);
    });
    post.replies = updatedReplies;
    handleUpdatePostClient(post);
  };

  const handleAddReply = (reply: IPostReply, post: IformPost) => {
    post.replies = [reply, ...post.replies];
    handleUpdatePostClient(post);
    post.isRepliesShowed = true;
  };
  const handleDeleteReply = (replyId: string, post: IformPost) => {
    post.replies = [...post.replies.filter(r => r.id !== replyId)];
    handleUpdatePostClient(post);
    if (post.replies.length === 0) {
      post.isRepliesShowed = false;
    }
  };

  useEffect(() => {
    agent.Posts.list()
      .then(response => {
        let formPosts: IformPost[] = [];
        response.forEach(responsePost => {
          let replies: IPostReply[];
          if (responsePost.replies == null) {
            replies = [];
          } else {
            replies = responsePost.replies;
          }
          let edited = false;
          if (responsePost.hasBeenEdited) {
            edited = true;
          }
          formPosts.push({
            id: responsePost.id,
            username: responsePost.username,
            content: responsePost.content,
            hasBeenEdited: edited,
            date: responsePost.date,
            isFormShowed: false,
            isInEditMode: false,
            isRepliesShowed: false,
            replies: replies
          });
        });
        setPosts(formPosts);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content="Loading" />;

  return (
    <Fragment>
      <Container style={{ marginTop: "4em" }}>
        <PostDashboard
          submitting={submitting}
          posts={posts}
          editPostClient={handleUpdatePostClient}
          editPostServer={handleUpdatePostServer}
          addPost={handleAddPost}
          deletePost={handleDeletePost}
          addReply={handleAddReply}
          deleteReply={handleDeleteReply}
          editReply={handleUpdateReply}
          target={target}
          updatePopup={handleUpdatePopup}
          popupMessage={popupMessage}
        />
      </Container>
    </Fragment>
  );
};

export default App;
