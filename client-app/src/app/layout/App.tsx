import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { Ipost } from "../../models/post";
import { PostDashboard } from "../../features/posts/dashboard/PostDashboard";
import { IformPost } from './../../models/formPost';

const App = () => {
  const [posts, setPosts] = useState<IformPost[]>([]);

  const handleEditPost = (post: IformPost) => {
    let updatedPosts : IformPost[] = [];
    posts.map(otherPost => {
      if (otherPost.id === post.id) updatedPosts.push(post);
      else updatedPosts.push(otherPost);
    });
    //  setPosts([...posts.filter(a => a.id !== post.id), post]);
    setPosts(updatedPosts);
  };

  const handleAddPost = (post: IformPost) => {
    setPosts([post,...posts]);
  }

  const handleDeletePost = (id: string) => {
    setPosts([...posts.filter(p => p.id !== id)])
  }

  useEffect(() => {
    axios.get<Ipost[]>("http://localhost:5000/api/posts").then(response => {
      let temp = response.data;
      let formPosts: IformPost[] = []
      temp.forEach(responsePost => {
        formPosts.push({
          id: responsePost.id,
          username: responsePost.username,
          content: responsePost.content,
          date: responsePost.date,
          isFormShowed: false,
          isInEditMode: false,
          replies: responsePost.replies
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
          editPost={handleEditPost}
          addPost={handleAddPost}
          deletePost={handleDeletePost}
        ></PostDashboard>
      </Container>
    </Fragment>
  );
};

export default App;
