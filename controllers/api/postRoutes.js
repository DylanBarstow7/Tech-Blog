const router = require('express').Router();
const { Post, Comment } = require('../../models');
const auth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/:id/comment', async (req, res) => {
  try {
    const newComment = await Comment.create({
      body: req.body.comment,
      user_id: req.session.user_id,
      post_id: req.params.id
    });

    res.status(200).json(newComment);
    console.log(newComment);
    
  } catch (err) {
    res.status(400).json(err)
  }
})


// Need a Put Route

router.put('/:id', auth, async (req, res) => {
  try {
    const postData = await Post.update({
      title: req.body.title,
      content: req.body.content,
    },{
      where: { id: req.params.id }
    });

    if(!postData){
      res.status(500).json(postData);
    }
    
    res.status(200).json(postData);
    
  } catch (error) {
    res.status(404).json(error);
  }
})



router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;