import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import { PostDashboard } from "../../features/posts/dashboard/PostDashboard";
import { LoadingComponent } from "./LoadingComponent";
import PostStore from '../stores/postStore';
import {observer} from 'mobx-react-lite';
import { Route } from "react-router-dom";
import { HomePage } from './../../features/posts/home/HomePage';

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
        <Route exact path='/' component={HomePage}/>
        <Route path='/posts' component={PostDashboard} />
      </Container>
    </Fragment>
  );
};

export default observer(App);
