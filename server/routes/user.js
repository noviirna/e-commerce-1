const router = require(`express`).Router();
const controller = require("../controllers/user");
const { authentication } = require("../middlewares/auth");

router.post(`/register`, controller.register);
router.post(`/login`, controller.login);
router.post(`/logingoogle`, controller.logingoogle);

router.use(authentication);
router.patch(`/`, authentication, controller.update);

module.exports = router;
