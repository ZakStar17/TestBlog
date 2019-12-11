import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext } from "react";
import { Ipost } from "../../models/post";
import agent from "../api/agent";
import { IPostReply } from "./../../models/postReply";
import { IformPost } from "./../../models/formPost";

configure({ enforceActions: "always" });

export class PostStore {
  convertToPost(formPost: IformPost): Ipost {
    let newDate = new Date();
    newDate.setMilliseconds(Date.parse(formPost.date));
    return {
      id: formPost.id,
      username: formPost.username,
      content: formPost.content,
      hasBeenEdited: formPost.hasBeenEdited,
      date: newDate,
      replies: Array.from(formPost.replies.values())
    };
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  @observable postRegistry: Map<string, IformPost> = new Map();
  @observable loadingInitial = true;
  @observable submitting = false;
  @observable target = "";
  @observable postDeletePopup: IformPost | null = null;
  @observable replyDeletePopup: [IPostReply, IformPost] | null = null;

  @computed get postsByDate() {
    return Array.from(this.postRegistry.values()).sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date)
    );
  }

  @action loadPosts = async () => {
    this.loadingInitial = true;
    try {
      const posts = await agent.Posts.list();
      runInAction("Loading posts", () => {
        posts.forEach((post) => {
          let replies = new Map<string, IPostReply>();
          if (post.replies !== null) {
            post.replies.map(reply => {
              replies.set(reply.id, reply);
              return true
            });
            
          }
          let edited = false;
          if (post.hasBeenEdited) {
            edited = true;
          }
          this.postRegistry.set(post.id, {
            id: post.id,
            username: post.username,
            content: post.content,
            hasBeenEdited: edited,
            date: String(post.date),
            isFormShowed: false,
            isInEditMode: false,
            isRepliesShowed: false,
            replies: replies
          });
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("Loading posts error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action updatePostDeletePopup = (post: IformPost | null) => {
    this.submitting = true;
    this.postDeletePopup = post;
    this.submitting = false;
  };

  @action updateReplyDeletePopup = (
    replyAndPost: [IPostReply, IformPost] | null
  ) => {
    this.submitting = true;
    this.replyDeletePopup = replyAndPost;
    this.submitting = false;
  };

  @action updatePostClient = async (post: IformPost) => {
    this.submitting = true;
    this.postRegistry.set(post.id, post);
    this.submitting = false;
  };

  @action updatePostServer = async (
    post: IformPost,
    content: string | null = null
  ) => {
    this.submitting = true;
    if (content) {
      post.content = content;
      post.hasBeenEdited = true;
    }
    try {
      let serverPost = this.convertToPost(post);
      // ** this is only because server shows an error when giving an post with replies
      serverPost.replies = [];
      await agent.Posts.update(serverPost);
      runInAction("updating a post to the server", () => {
        post.isInEditMode = false;
        this.postRegistry.set(post.id, post);
        this.submitting = false;
      });
    } catch (error) {
      runInAction("error when updating a post to the server", () => {
        this.submitting = false;
      });
    }
  };

  @action addPost = async (post: Ipost) => {
    this.submitting = true;
    this.target = "newComment";
    try {
      await agent.Posts.create(post);
      runInAction("adding post", () => {
        let newFormPost: IformPost = {
          id: post.id,
          username: post.username,
          content: post.content,
          hasBeenEdited: post.hasBeenEdited,
          date: post.date.toUTCString(),
          replies: new Map<string, IPostReply>(),
          isFormShowed: false,
          isInEditMode: false,
          isRepliesShowed: false
        };
        this.postRegistry.set(newFormPost.id, newFormPost);
        this.submitting = false;
      });
    } catch (error) {
      runInAction("error when adding a post", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deletePost = async (id: string) => {
    this.submitting = true;
    this.target = "";
    try {
      await agent.Posts.delete(id);
      runInAction("deleting post", () => {
        this.postRegistry.delete(id);
        this.submitting = false;
        this.postDeletePopup = null;
      });
    } catch (error) {
      runInAction("error when deleting a post", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action updateTarget = (newTarget: string) => {
    this.target = newTarget;
  };
  @action updateReplyClient = (reply: IPostReply, post: IformPost) => {
    this.submitting = true;
    post.replies.set(reply.id, reply);
    this.updatePostClient(post);
  };
  @action updateReplyServer = async (
    reply: IPostReply,
    post: IformPost,
    content: string | null = null
  ) => {
    this.submitting = true;
    this.target = reply.id;
    try {
      await this.sleep(1000);
      runInAction("updating a reply on the server", () => {
        if (content) reply.content = content;
        reply.isFormShowed = false;
        reply.isInEditMode = false;
        reply.hasBeenEdited = true;
        post.replies.set(reply.id, reply);
        this.updatePostClient(post);
      });
    } catch (error) {
      runInAction("error when updating a reply on the server", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action addReply = async (
    reply: IPostReply,
    post: IformPost,
    messageFrom: string | null = null
  ) => {
    this.submitting = true;
    if (messageFrom) this.target = messageFrom;
    try {
      await this.sleep(1000);
      runInAction("adding a new reply", () => {
        post.replies.set(reply.id, reply);
        post.isRepliesShowed = true;
        this.updatePostClient(post);
      });
    } catch (error) {
      runInAction("error when adding a new reply", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deleteReply = async (replyId: string, post: IformPost) => {
    this.submitting = true;
    this.target = replyId;
    try {
      await this.sleep(1000);
      runInAction("deleting a reply", () => {
        this.replyDeletePopup = null;
        post.replies.delete(replyId);
        this.updatePostClient(post);
        this.submitting = false;
      });
    } catch (error) {
      runInAction("error when deleting a reply", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action setReplyMode(object: IformPost | IPostReply, bool: boolean = true) {
    object.isFormShowed = bool;
  }
  @action setEditMode(object: IformPost | IPostReply, bool: boolean = true) {
    object.isInEditMode = bool;
  }
  @action showReplies(object: IformPost, bool: boolean = true) {
    object.isRepliesShowed = bool;
  }
}

export default createContext(new PostStore());
