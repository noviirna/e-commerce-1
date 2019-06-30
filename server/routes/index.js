const { sendUploadToGCS, multer } = require("../middlewares/uploadtocloud");
const router = require(`express`).Router();
const user = require(`./user`);
const product = require("./product");
const cart = require("./cart");
const api = require("../controllers/api");

router.get("/", (req, res, next) => {
  res.json("Server udah jalan yaa :)");
});

router.get("/getcities", api.getCities);
router.post("/getongkir", api.getOngkir);

router.use(`/users`, user);
router.use(`/products`, product);
router.use(`/carts`, cart);

router.post("/uploadimg", multer.single("image"), sendUploadToGCS, function(
  req,
  res,
  next
) {
  if (req.file) {
    res.status(200).json(req.file.cloudStoragePublicUrl);
  } else {
    res.status(500).send("Unable to upload");
  }
});

module.exports = router;
