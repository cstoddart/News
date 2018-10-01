import React, { Component } from 'react';

import { getPostsFromAllSources, getNextPostsFromAllSources } from '../../sources';
import { PostList } from '../ui';
// import Reddit from '../sources/Reddit';

class Home extends Component {
  state = {
    posts: [],
    nextPageTokens: {
      reddit: '',
    }
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

  render() {
    return <PostList posts={this.state.posts} nextPage={this.getNextPage} />;
  }
}

export default Home;
