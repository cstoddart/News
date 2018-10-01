const blogs = [
  'https://blog.logrocket.com/',
];

export async function getMediumPosts() {
  const posts = await blogs.reduce(async (posts, blog) => {
    const post = await fetch(`${blog}?format=json`)
      .then(response => response.json()); 
    posts.push(post)
  }, []);
  console.log('posts', posts);
  // const posts = data.children.map(child => {
  //   const post = child.data;
  //   return {
  //     id: post.id,
  //     thumbnail: post.thumbnail,
  //     title: post.title,
  //     source: `r/${post.subreddit}`,
  //     sourceType: 'reddit',
  //   };
  // });
  // const nextPageToken = data.after;
  // console.log('POSTS', posts);

  return {
    posts,
  };
}

// export async function getNextRedditPosts(nextPageToken) {
//   const { data } = await fetch(`https://www.reddit.com/r/ProgrammerHumor+Frontend+javascript+learnjavascript+programming+reactjs+webdev.json?after=${nextPageToken}`)
//     .then(response => response.json());
//   const posts = data.children.map(child => {
//     const post = child.data;
//     return {
//       id: post.id,
//       thumbnail: post.thumbnail,
//       title: post.title,
//       source: `r/${post.subreddit}`,
//     };
//   });

//   return {
//     posts,
//     nextPageToken: data.after,
//   };
// }

// export async function getRedditPost({ id, source }) {
//   const data = await fetch(`https://www.reddit.com/${source}/comments/${id}.json`)
//     .then(response => response.json());
//   console.log('DATA', data);
//   const post = data[0].data.children[0].data;
//   const comments = data[1].data.children;
//   console.log('COMMENTS', comments);
//   let mediaType;
//   let mediaSource;

//   if (post.media && post.media.reddit_video) {
//     mediaType = 'video';
//     mediaSource = post.media.reddit_video.fallback_url;
//   } else if (
//     post.url.includes('.png') ||
//     post.url.includes('.jpg') ||
//     post.url.includes('.jpeg')
//   ) {
//     mediaType = 'image';
//     mediaSource = post.url;
//   }

//   return {
//     title: post.title,
//     media: {
//       type: mediaType,
//       source: mediaSource
//     },
//     text: post.selftext,
//     comments: comments,
//   };
// }
