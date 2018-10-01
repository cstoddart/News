export async function getRedditPosts() {
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
  const nextPageToken = data.after;
  // console.log('POSTS', posts);

  return {
    posts,
    nextPageToken,
  };
}

export async function getNextRedditPosts(nextPageToken) {
  const { data } = await fetch(`https://www.reddit.com/r/ProgrammerHumor+Frontend+javascript+learnjavascript+programming+reactjs+webdev.json?after=${nextPageToken}`)
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

  return {
    posts,
    nextPageToken: data.after,
  };
}
