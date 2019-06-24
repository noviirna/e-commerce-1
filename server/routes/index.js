const router = require(`express`).Router();

const user = require(`./user`);

router.get("/", (req, res, next) => {
  res.json("Server udah jalan yaa :)");
});

router.use(`/users`, user);

module.exports = router;
