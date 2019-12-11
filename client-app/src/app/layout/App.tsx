import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import { PostDashboard } from "../../features/posts/dashboard/PostDashboard";
import { LoadingComponent } from "./LoadingComponent";
import PostStore from '../stores/postStore';
import {observer} from 'mobx-react-lite';

const App = () => {
  const postStore = useContext(PostStore);

  useEffect(() => {
    postStore.loadPosts()
  }, [postStore]);

  if (postStore.loadingInitial) return <LoadingComponent content="Loading" />;

  const {submitting} = postStore
  return (
    <Fragment>
      <Container style={{ marginTop: "4em" }}>
        <PostDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
