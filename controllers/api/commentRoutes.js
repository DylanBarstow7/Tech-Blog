const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// CREATES/POSTS A NEW COMMENT
router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// FINDS/GETS ALL COMMENTS FOR POST ID:
router.get("/:id", (req, res) => {
    Comment.findAll({
        where: {
            id: req.params.id,
        },
    })
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// EDIT/PUT COMMENT
router.put("/:id", withAuth, (req, res) => {
    Comment.update(
        {
            comment_text: req.body.comment_text,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((dbCommentData) => {
            if (!dbCommentData) {
                res.status(404).json({
                    message: "No comment found with this id",
                });
                return;
            }
            res.json(dbCommentData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE A COMMENT
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });

      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }

      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// FIND/GET ALL COMMENTS
router.get('/', async (req, res) => {
    // find all comments
    try {
      const commentData = await Comment.findAll();
      res.status(200).json(commentData);
    } catch (err){
      res.status(500).json(err);
    }
  });

module.exports = router;