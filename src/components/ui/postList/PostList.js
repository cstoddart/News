import React from 'react';
import PropTypes from 'prop-types';

import {
  StyledPostList,
  PostPreview,
  PostThumbnail,
} from './PostListStyles';

function infiniteScroll(event, nextPage) {
  const element = event.target;
  if (element.scrollHeight - (element.scrollTop + element.offsetHeight) < 1) {
    nextPage();
  }
}

const PostList = (props) => (
  <StyledPostList onScroll={event => infiniteScroll(event, props.nextPage)}>
    {props.posts.map(post => (
      <PostPreview key={post.id} onClick={() => props.showPost(post)}>
        {post.thumbnail && post.thumbnail.includes('http') ?
          <PostThumbnail src={post.thumbnail} />
          : null
        }
        <div>
          <h3>{post.title}</h3>
          <p>{post.source}</p>
          {post.summary &&
            <p>{post.summary}</p>
          }
        </div>
      </PostPreview>
    ))}
  </StyledPostList>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    summary: PropTypes.string,
  }))
};

export default PostList;
