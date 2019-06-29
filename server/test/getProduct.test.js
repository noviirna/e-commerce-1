const app = require("../app");

const chai = require("chai"); // untuk pakai fungsi assertion chai
const chaiHttp = require("chai-http"); // untuk pakai chai request http
const expect = chai.expect; // untuk pakai fungsi expect di chai
chai.should(); // untuk pakai fungsi should
chai.use(chaiHttp); // untuk pakai chai HTTP

const User = require("../models/user");

const path = "/products";

const {
  deleteAllUser,
  createMockUser,
  deleteAllProduct,
  mockLogin,
  createMockProducts
} = require("../helpers/testHelpers");

var admin = {
  name: "admin",
  email: "admin@ecommerce.com",
  password: "12345678"
};

var mock_product = {
  name: "product name",
  picture: "product picture",
  stock: 20,
  price: 100000,
  description: "product description",
  tags: [],
};

describe(`
GET ${path}
`, () => {
  before(done => {
    deleteAllProduct();
    deleteAllUser();
    console.log("START ========================> GET /products\n\n");
    done();
  });
  after(done => {
    console.log("\n\nEND ========================> GET /products");
    deleteAllUser();
    deleteAllProduct();
    done();
  });

  describe(`
AUTHENTICATION TEST
`, () => {
    before(done => {
      chai
        .request(app)
        .post("/users/register")
        .send(admin)
        .then(res => {
          admin._id = res.body._id;
          admin._picture = res.body.picture;
          admin.token = mockLogin(admin);
          done();
        })
        .catch(err => {
          console.log(JSON.stringify(err, undefined, 2));
        });
    });
    it(`
      ACCESS AS AUTHENTICATD USER
        `, done => {
      //
      chai
        .request(app)
        .get(path)
        .set("token", admin.token)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body)
            .to.be.an("array")
            .with.lengthOf(0);

          done();
        })
        .catch(err => {
          console.log(JSON.stringify(err, undefined, 2));
        });
    });

    it(`
      ACCESS AS UNAUTHENTICATED USER
        `, done => {
      //
      chai
        .request(app)
        .get(path)
        .set("token", "token palsu :)")
        .then(res => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.be.an("string");
          expect(res.body.message).to.equal(
            "Invalid access token, you have to login first"
          );

          done();
        })
        .catch(err => {
          console.log(JSON.stringify(err, undefined, 2));
        });
    });
  });

  describe(`
  VALUE TEST
  `, () => {
    before(done => {
      createMockProducts(mock_product);
      done();
    });
    it(`
      GET MOCK PRODUCTS
      - LENGTH
      - DATA TYPE
      - VALUE
        `, done => {
      //
      chai
        .request(app)
        .get(path)
        .send(mock_product)
        .set("token", admin.token)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body)
            .to.be.an("array")
            .with.lengthOf(10);
          expect(res.body[0]).to.be.an("object");
          expect(res.body[0]).to.have.property("_id");
          expect(res.body[0]).to.have.property("name");
          expect(res.body[0]).to.have.property("picture");
          expect(res.body[0]).to.have.property("stock");
          expect(res.body[0]).to.have.property("price");
          expect(res.body[0]).to.have.property("description");
          expect(res.body[0]).to.have.property("tags");

          expect(res.body[0].name).to.be.an("string");
          expect(res.body[0].picture).to.be.an("string");
          expect(res.body[0].stock).to.be.an("number");
          expect(res.body[0].price).to.be.an("number");
          expect(res.body[0].description).to.be.an("string");
          expect(res.body[0].tags).to.be.an("array");

          expect(res.body[0].name).to.equal(mock_product.name);
          expect(res.body[0].picture).to.equal(mock_product.picture);
          expect(res.body[0].stock).to.equal(mock_product.stock);
          expect(res.body[0].price).to.equal(mock_product.price);
          expect(res.body[0].description).to.equal(mock_product.description);
          expect(res.body[0].tags).to.deep.equal(mock_product.tags);

          done();
        })
        .catch(err => {
          console.log(JSON.stringify(err, undefined, 2));
        });
    });
  });
});
