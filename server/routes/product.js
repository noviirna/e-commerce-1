const router = require(`express`).Router();
const controller = require("../controllers/product");
const { authentication, adminAccess } = require("../middlewares/auth");

router.use(authentication); // check token & get req.user

// router.get(`/user`, controller.user); // get user own data
// router.get(`/:id`, controller.detail); // get detail
router.get(`/`, controller.all); // get all data
router.post(`/`, adminAccess, controller.create); // create
// router.patch(`/:id`, authorization, controller.update); // update
// router.delete(`/:id`, authorization, controller.delete); // delete

module.exports = router;
