import React, { Component } from 'react';
import axios from 'axios';

import { PostList } from '../ui';

class Reddit extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data } = await axios.get('https://www.reddit.com/r/ProgrammerHumor+Frontend+javascript+learnjavascript+programming+reactjs+webdev.json');
    const posts = data.data.children.map(child => child.data);
    console.log('POSTS', posts);

    this.setState({ posts });
  }

  getPost = async (id, subreddit) => {
    const { data } = await axios.get(`https://www.reddit.com/r/${subreddit}/comments/${id}.json`);
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

  render() {
    return (
      <div>
        <PostList posts={this.state.posts} getPost={this.getPost} />
      </div>
    );
  }
}

export default Reddit;
