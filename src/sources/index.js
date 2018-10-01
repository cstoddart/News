import { getRedditPosts, getNextRedditPosts, getRedditPost } from './reddit';
import { getMediumPosts } from './medium';

export async function getPostsFromAllSources() {
  const {
    posts: redditPosts,
    nextPageToken: redditNextPageToken
  } = await getRedditPosts();

  // const {
  //   posts: mediumPosts,
  // } = await getMediumPosts();
  // console.log('MEDIUM POSTS', mediumPosts);

  return {
    posts: [
      ...redditPosts,
      // ...mediumPosts,
    ],
    nextPageTokens: {
      reddit: redditNextPageToken,
    },
  };
};

export async function getNextPostsFromAllSources(nextPageTokens) {
  const {
    posts: redditPosts,
    nextPageToken: redditNextPageToken
  } = await getNextRedditPosts(nextPageTokens.reddit);

  return {
    posts: [
      ...redditPosts,
    ],
    nextPageTokens: {
      reddit: redditNextPageToken,
    },
  };
};

export async function getPostFromSource(post) {
  if (post.sourceType === 'reddit') {
    return getRedditPost(post);
  }
}
