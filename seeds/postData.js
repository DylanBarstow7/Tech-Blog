const { Post } = require('../models');

const postData = [
  {
    title: 'Javascript Post',
    content: "Here is the post on JavaScript by Sal",
    user_id: 1
  },
  {
    title: 'HTML Post',
    content: "Here is the post on HTML by Lernantino",
    user_id: 2
  },
  {
    title: 'CSS Post',
    content: "Here is the post on CSS by Amiko",
    user_id: 3
  }
]

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
