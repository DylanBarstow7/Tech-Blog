const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const auth = require("../utils/auth");

// When the homepage is loaded, it will display the post data and each post"s user data.
router.get("/", async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    // Serialize data so the template can read it
    const posts = postData.map(post => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Then the post is called on the "post" page, the post will be found based on the given ID, the data will be gathered including the user name and date. The comments associated with that post will also be displayed including the associated user and date of the comment.
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: [
            "title", 
            "description", 
            "date_created"
          ],
          include: [{
            model: User, 
            attributes:["username"]
          }]
        },
      ],
    });

    const post = postData.get({ plain: true });

    console.log(post);

    res.render("post", {
        ...post,
        loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
      res.redirect("/dashboard");
      console.log(req.session.loggedIn);
      return;
  }
  // Otherwise, render the "login" template
  res.render("login");
});

router.get("/signup", (req,res) => {
  res.render("signup");
});

router.get("/dashboard", auth, async (req, res) => {
  try {
      const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ["password"] },
          include: [{ model: Post }],
      });

      const user = userData.get({ plain: true });

      res.render("dashboard", {
        ...user,
        loggedIn: true
      });
      console.log(user);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get("/dashboard/post/:id", auth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: [
          "title", 
          "description", 
          "date_created"
        ],
        include: [{
          model: User, 
          attributes:["username"]
        }],
      },
    ],
  }); 

  const post = postData.get({ plain: true });
  
  res.render("editpost", {
    ...post,
    loggedIn: req.session.loggedIn
  });
  } catch (err) {
  res.status(500).json(err);
  }
});

module.exports = router;