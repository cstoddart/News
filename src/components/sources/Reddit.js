import React, { Component } from 'react';
import axios from 'axios';

import { PostList } from '../ui';

class Reddit extends Component {
  state = {
    posts: [{
      id: '',
      thumbnail: '',
      title: '',
      category: '',
    }],
    nextPage: '',
  };

  async componentDidMount() {
    const { data: { data } } = await axios.get('https://www.reddit.com/r/ProgrammerHumor+Frontend+javascript+learnjavascript+programming+reactjs+webdev.json');
    // console.log('DATA', data);
    const posts = data.children.map(child => {
      const post = child.data;
      return {
        id: post.id,
        thumbnail: post.thumbnail,
        title: post.title,
        category: `r/${post.subreddit}`,
      };
    });
    const nextPage = data.after;
    // console.log('POSTS', posts);

    this.setState({
      posts,
      nextPage,
    });
  }

  getPost = async ({ id, category }) => {
    console.log('ID', id);
    console.log('CATEGORY', category);
    const { data } = await axios.get(`https://www.reddit.com/${category}/comments/${id}.json`);
    const postDetails = data[0].data.children[0].data;
    console.log('POST DETAILS', postDetails);
    const postComments = data[1];

    let mediaType;
    let mediaSource;

    if (postDetails.media && postDetails.media.reddit_video) {
      mediaType = 'video';
      mediaSource = postDetails.media.reddit_video.fallback_url;
    } else if (
      postDetails.url.includes('.png') ||
      postDetails.url.includes('.jpg') ||
      postDetails.url.includes('.jpeg')
    ) {
      mediaType = 'image';
      mediaSource = postDetails.url;
    }

    const post = {
      title: postDetails.title,
      media: {
        type: mediaType,
        source: mediaSource
      },
      text: postDetails.selftext,
    };
    console.log('POST', post);
    return post;
  }

  nextPage = async () => {
    const { data: { data } } = await axios.get(`https://www.reddit.com/r/ProgrammerHumor+Frontend+javascript+learnjavascript+programming+reactjs+webdev.json?after=${this.state.nextPage}`);
    const posts = data.children.map(child => {
      const post = child.data;
      return {
        id: post.id,
        thumbnail: post.thumbnail,
        title: post.title,
        category: `r/${post.subreddit}`,
      };
    });
    const nextPage = data.after;

    this.setState({
      posts: [...this.state.posts, ...posts],
      nextPage,
    });
  }

  render() {
    return (
      <div>
        <PostList
          posts={this.state.posts}
          getPost={this.getPost}
          nextPage={this.nextPage}
        />
      </div>
    );
  }
}

export default Reddit;
