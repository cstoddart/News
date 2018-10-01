import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Post from '../post/Post';
import {
  StyledPostList,
  PostPreview,
  PostThumbnail,
} from './PostListStyles';

class PostList extends Component {
  state = {
    showPost: false,
    currentPost: null,
  };

  showPost = async (post) => {
    const currentPost = await this.props.getPost(post);

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

  infiniteScroll = (event) => {
    const element = event.target;
    if (element.scrollHeight - (element.scrollTop + element.offsetHeight) < 1) {
      this.props.nextPage();
    }
  }

  render() {
    return (
      <StyledPostList onScroll={this.infiniteScroll}>
        {this.props.posts.map(post => (
          <PostPreview key={post.id} onClick={() => this.showPost(post)}>
            {post.thumbnail && post.thumbnail.includes('http') ?
              <PostThumbnail src={post.thumbnail} />
              : null
            }
            <div>
              <h3>{post.title}</h3>
              <p>{post.source}</p>
            </div>
          </PostPreview>
        ))}
        {this.state.showPost && 
          <Post post={this.state.currentPost} hidePost={this.hidePost} />
        }
      </StyledPostList>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired
  }))
};

export default PostList;
