import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { Ipost } from "../../models/post";
import { PostDashboard } from "../../features/posts/dashboard/PostDashboard";
import { IformPost } from './../../models/formPost';
import { IPostReply } from "../../models/postReply";

const App = () => {
  const [posts, setPosts] = useState<IformPost[]>([]);

  const handleUpdatePost = (post: IformPost) => {
    let updatedPosts : IformPost[] = [];
    posts.map(otherPost => {
      if (otherPost.id === post.id) updatedPosts.push(post);
      else updatedPosts.push(otherPost);
    });
    setPosts(updatedPosts);
  };

  const handleAddPost = (post: IformPost) => {
    setPosts([post,...posts]);
  }

  const handleAddReply = (reply: IPostReply, post: IformPost) => {
    post.replies = [reply, ...post.replies];
    handleUpdatePost(post)
    post.isRepliesShowed = true
  }
  const handleDeleteReply = (replyId: string, post: IformPost) => {
    post.replies = [...post.replies.filter(r => r.id !== replyId)];
    handleUpdatePost(post)
    if (post.replies.length == 0) {
      post.isRepliesShowed = false
    }
  }
  const handleUpdateReply = (reply: IPostReply, post: IformPost) => {
    let updatedReplies : IPostReply[] = [];
    post.replies.map(otherReply => {
      if (otherReply.id === reply.id) updatedReplies.push(reply);
      else updatedReplies.push(otherReply);
    });
    post.replies = updatedReplies;
    handleUpdatePost(post);
  }


  const handleDeletePost = (id: string) => {
    setPosts([...posts.filter(p => p.id !== id)])
  }

  useEffect(() => {
    axios.get<Ipost[]>("http://localhost:5000/api/posts").then(response => {
      let temp = response.data;
      let formPosts: IformPost[] = []
      temp.forEach(responsePost => {
        let replies: IPostReply[];
        if (responsePost.replies == null) {
          replies = [];
        } else {
          replies = responsePost.replies
        }
        let edited = false
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
        })
      });
      setPosts(formPosts);
    });
  }, []);

  return (
    <Fragment>
      <Container style={{ marginTop: "4em" }}>
        <PostDashboard
          posts={posts}
          editPost={handleUpdatePost}
          addPost={handleAddPost}
          deletePost={handleDeletePost}
          addReply={handleAddReply}
          deleteReply={handleDeleteReply}
          editReply={handleUpdateReply}
         />
      </Container>
    </Fragment>
  );
};

export default App;
