import React, { Component } from 'react';

import { PostList } from '../ui';

class Reddit extends Component {
  state = {
    posts: [{
      id: '',
      thumbnail: '',
      title: '',
      source: '',
    }],
    nextPage: '',
  };

  async componentDidMount() {
    const { data } = await fetch('https://www.reddit.com/r/ProgrammerHumor+Frontend+javascript+learnjavascript+programming+reactjs+webdev.json')
      .then(response => response.json());
    // console.log('DATA', data);
    const posts = data.children.map(child => {
      const post = child.data;
      return {
        id: post.id,
        thumbnail: post.thumbnail,
        title: post.title,
        source: `r/${post.subreddit}`,
      };
    });
    const nextPage = data.after;
    // console.log('POSTS', posts);

    this.setState({
      posts,
      nextPage,
    });
  }

  getPost = async ({ id, source }) => {
    const data = await fetch(`https://www.reddit.com/${source}/comments/${id}.json`)
      .then(response => response.json());
    console.log('DATA', data);
    const post = data[0].data.children[0].data;
    const comments = data[1].data.children;
    console.log('COMMENTS', comments);
    let mediaType;
    let mediaSource;

    if (post.media && post.media.reddit_video) {
      mediaType = 'video';
      mediaSource = post.media.reddit_video.fallback_url;
    } else if (
      post.url.includes('.png') ||
      post.url.includes('.jpg') ||
      post.url.includes('.jpeg')
    ) {
      mediaType = 'image';
      mediaSource = post.url;
    }

    return {
      title: post.title,
      media: {
        type: mediaType,
        source: mediaSource
      },
      text: post.selftext,
      comments: comments,
    };
  }

  nextPage = async () => {
    const { data: { data } } = await fetch(`https://www.reddit.com/r/ProgrammerHumor+Frontend+javascript+learnjavascript+programming+reactjs+webdev.json?after=${this.state.nextPage}`)
      .then(response => response.json());
    const posts = data.children.map(child => {
      const post = child.data;
      return {
        id: post.id,
        thumbnail: post.thumbnail,
        title: post.title,
        source: `r/${post.subreddit}`,
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
