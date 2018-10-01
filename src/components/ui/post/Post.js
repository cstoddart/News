import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import {
  PostTitle,
  PostImage,
  PostText,
} from './PostStyles';

const Post = ({ post, hidePost }) => (
  <Modal closeModal={hidePost}>
    <PostTitle>{post.title}</PostTitle>
    {post.media.type === 'image' &&
      <PostImage src={post.media.source} />
    }
    {post.media.type === 'video' &&
      <video autoPlay >
        <source src={post.media.source} type="video/mp4" />
      </video>
    }
    <PostText>{post.text}</PostText>
  </Modal>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  media: PropTypes.shape({
    type: PropTypes.oneOf([ 'image', 'video']).isRequired,
    source: PropTypes.string.isRequired,
  }),
  text: PropTypes.string,
}

export default Post;
