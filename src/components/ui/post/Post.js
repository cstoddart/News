import React from 'react';

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

export default Post;
