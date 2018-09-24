import React, { Component } from 'react';

import Post from '../post/Post';
import {
  PostPreview,
  PostThumbnail,
} from './PostListStyles';

class PostList extends Component {
  state = {
    showPost: false,
    currentPost: null,
  };

  showPost = async (post) => {
    const currentPost = await this.props.getPost(post.id, post.subreddit);

    this.setState({
      showPost: true,
      currentPost,
    });
  };

  hidePost = () => {
    this.setState({
      showPost: false,
      currentPost: null,
    })
  }

  render() {
    return (
      <div>
        {this.props.posts.map(post => (
          <PostPreview key={post.id} onClick={() => this.showPost(post)}>
            {post.thumbnail.includes('http') ?
              <PostThumbnail src={post.thumbnail} />
              : null
            }
            <div>
              <h3>{post.title}</h3>
              <p>{post.subreddit}</p>
            </div>
          </PostPreview>
        ))}
        {this.state.showPost && 
          <Post post={this.state.currentPost} hidePost={this.hidePost} />
        }
      </div>
    );
  }
}

export default PostList;
