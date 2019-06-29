const router = require(`express`).Router();
const controller = require("../controllers/cart");
const {
  authentication,
  adminAccess,
  cartAuth
} = require("../middlewares/auth");

router.use(authentication); // check token & get req.user

router.post(`/`, controller.create); // create

router.get(`/`, adminAccess, controller.all);
router.get(`/:id`, cartAuth, controller.detail); // get detail
router.get(`/user/:id`, controller.user); // get all data for a suer

router.patch(`/:id`, cartAuth, controller.update); // update
router.delete(`/:id`, adminAccess, cartAuth, controller.delete); // delete

module.exports = router;
