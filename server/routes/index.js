const router = require(`express`).Router();

const user = require(`./user`);
const product = require("./product");
const cart = require("./cart");

router.get("/", (req, res, next) => {
  res.json("Server udah jalan yaa :)");
});

router.use(`/users`, user);
router.use(`/products`, product);
router.use(`/carts`, cart);

module.exports = router;
