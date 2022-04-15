const { postComment, getComments } = require("../controllers/comment");

const router = require("express")();

router.route("/comments").post(postComment);
router.route("/comments/:id").get(getComments);

module.exports = router;
