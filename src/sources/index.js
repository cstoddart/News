import { getRedditPosts, getNextRedditPosts } from './reddit';

export async function getPostsFromAllSources() {
  const {
    posts: redditPosts,
    nextPageToken: redditNextPageToken
  } = await getRedditPosts();

  return {
    posts: [
      ...redditPosts,
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
