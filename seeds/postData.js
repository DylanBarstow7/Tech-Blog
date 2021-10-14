const { Post } = require('../models');

const postData = [
{
  title: 'Javascript Post',
  description: "Here is the post on JavaScript by Sal",
  date_created: "12/01/2020",
  user_id: 1,
},
{
  title: 'HTML Post',
  description: "Here is the post on HTML by Lernantino",
  date_created: "12/02/2020",
  user_id: 2,
},
{
  title: 'CSS Post',
  description: "Here is the post on CSS by Amiko",
  date_created: "12/03/2021",
  user_id: 3,
},
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
