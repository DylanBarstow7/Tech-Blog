const { Comment } = require('../models');

const commentData = [
// TODO: UPDATE
  {
    body: "Here is the first comment on JavaScript by Sal",
    user_id: 1,
    post_id: 1,
  },
  {
    body: "Here is the second comment on JavaScript by Lernantino",
    user_id: 2,
    post_id: 1,
  },
  {
    body: "Here is the third comment on JavaScript by Amiko",
    user_id: 3,
    post_id: 1,
  },
  {
    body: "Here is the first comment on HTML by Sal",
    user_id: 1,
    post_id: 2,
  },
  {
    body: "Here is the second comment on HTML by Lernantino",
    user_id: 2,
    post_id: 2,
  },
  {
    body: "Here is the third comment on HTML by Amiko",
    user_id: 3,
    post_id: 2,
  },
  {
    body: "Here is the first comment on CSS by Sal",
    user_id: 1,
    post_id: 3,
  },
  {
    body: "Here is the second comment on CSS by Lernantino",
    user_id: 2,
    post_id: 3,
  },
  {
    body: "Here is the third comment on CSS by Amiko",
    user_id: 3,
    post_id: 3,
  },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
