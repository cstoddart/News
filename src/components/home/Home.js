import React, { Component, Fragment } from 'react';

import { getPostsFromAllSources, getNextPostsFromAllSources, getPostFromSource } from '../../sources';
import { PostList, Post } from '../ui';

class Home extends Component {
  state = {
    posts: [],
    nextPageTokens: {
      reddit: '',
    },
    showPost: false,
    currentPost: {},
  }

  async componentDidMount() {
    const { posts, nextPageTokens } = await getPostsFromAllSources();

    this.setState({
      posts,
      nextPageTokens,
    });
  }

  getNextPage = async () => {
    const currentPosts = this.state.posts;
    const { posts, nextPageTokens } = await getNextPostsFromAllSources(this.state.nextPageTokens);

    this.setState({
      posts: [...currentPosts, ...posts],
      nextPageTokens,
    });
  }

  getPost = async (post) => {
    const currentPost = await getPostFromSource(post);

    this.setState({
      showPost: true,
      currentPost,
    });
  }

  render() {
    return (
      <Fragment>
        <PostList
          posts={this.state.posts}
          nextPage={this.getNextPage}
          showPost={this.getPost}
        />
        {this.state.showPost &&
          <Post post={this.state.currentPost} />
        }
      </Fragment>
    );
  }
}

export default Home;
