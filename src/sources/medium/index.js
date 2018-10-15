import { getLogRocketPosts } from './logRocket';

export async function getMediumPosts() {
  const {
    posts: logRocketPosts,
  } = await getLogRocketPosts();

  return {
    posts: [
      ...logRocketPosts,
    ],
  };
};
