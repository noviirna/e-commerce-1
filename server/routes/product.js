const router = require(`express`).Router();
const controller = require("../controllers/product");
const {
  authentication,
  adminAccess,
  productAuth
} = require("../middlewares/auth");

router.get(`/`, controller.all); // get all data
router.use(authentication); // check token & get req.user

router.get(`/:id`, controller.detail); // get detail
router.post(`/`, adminAccess, controller.create); // create
router.patch(`/:id`, adminAccess, productAuth, controller.update); // update
router.delete(`/:id`, productAuth, adminAccess, controller.delete); // delete

module.exports = router;
