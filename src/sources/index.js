import { getRedditPosts, getNextRedditPosts, getRedditPost } from './reddit';
import { getMediumPosts } from './medium';

export async function getPostsFromAllSources() {
  const {
    posts: redditPosts,
    nextPageToken: redditNextPageToken,
  } = await getRedditPosts();

  const {
    posts: mediumPosts,
  } = await getMediumPosts();

  const combinedPosts = [
    ...mediumPosts,
  ];

  let redditPostIndex = 0;
  combinedPosts
    .sort((a, b) => a.date < b.date)
    .forEach((post, index) => {
      if (index % 4 === 0) {
        const redditPost = redditPosts[redditPostIndex];
        combinedPosts.splice(index, 0, redditPost);
        redditPostIndex++;
      }
    });

  return {
    posts: combinedPosts,
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
