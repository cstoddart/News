import axios from 'axios';

export async function getLogRocketPosts() {
  const { data } = await axios.get('https://node-cstoddart703352.codeanyapp.com/logrocket');
  
  const posts = Object.values(data.payload.references.Post).map(post => {
    return {
      id: post.id,
      thumbnail: `https://cdn-images-1.medium.com/max/500/${post.virtuals.previewImage.imageId}`,
      title: post.title,
      summary: post.content.subtitle,
      source: `LogRocket`,
      sourceType: 'medium',
      date: post.firstPublishedAt,
    };
  });

  return {
    posts,
  };
}
