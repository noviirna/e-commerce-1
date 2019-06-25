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
  mockLogin
} = require("../helpers/testHelpers");

var admin = {
  name: "admin",
  email: "admin@ecommerce.com",
  password: "12345678"
};

var user_biasa = {
  name: "novi",
  email: "novi.irnawati@mail.com",
  password: "12345678"
};

var mock_product = {
  name: "product name",
  picture: "product picture",
  stock: 20,
  price: 100000,
  description: "product description",
  tags: [],
  likedby: []
};

describe(`
DELETE ${path}
`, () => {
  before(() => {
    console.log("START ========================> DELETE /products\n\n");
  });
  after(() => {
    console.log("\n\nEND ========================> DELETE /products");
    deleteAllUser();
    deleteAllProduct();
  });

  describe(`
DELETE PRODUCT AS ADMIN`, () => {
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
    describe(`
`, () => {
      before(done => {
        chai
          .request(app)
          .post("/products")
          .send(mock_product)
          .set("token", admin.token)
          .then(res => {
            mock_product._id = res.body._id;
            done();
          })
          .catch(err => {});
      });
      it(`
          WITH [ INVALID ] TOKEN - SHOW ERROR
        `, done => {
        //
        chai
          .request(app)
          .delete(path + "/" + mock_product._id)
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

      it(`
          WITH [ VALID ] TOKEN
        `, done => {
        //
        chai
          .request(app)
          .delete(path + "/" + mock_product._id)
          .set("token", admin.token)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("_id");
            expect(res.body).to.have.property("name");
            expect(res.body).to.have.property("picture");
            expect(res.body).to.have.property("stock");
            expect(res.body).to.have.property("price");
            expect(res.body).to.have.property("description");
            expect(res.body.name).to.be.an("string");
            expect(res.body.picture).to.be.an("string");
            expect(res.body.stock).to.be.an("number");
            expect(res.body.price).to.be.an("number");
            expect(res.body.description).to.be.an("string");
            expect(res.body.tags).to.deep.equal([]);
            expect(res.body.likedby).to.deep.equal([]);
            expect(res.body.name).to.equal("product name");
            expect(res.body.picture).to.equal("product picture");
            expect(res.body.stock).to.equal(20);
            expect(res.body.price).to.equal(100000);
            expect(res.body.description).to.equal("product description");
            expect(res.body.tags)
              .to.be.an("array")
              .with.lengthOf(0);
            expect(res.body.likedby)
              .to.be.an("array")
              .with.lengthOf(0);

            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
    });
  });

  describe(`
DELETE PRODUCT AS REGULAR USER`, () => {
    before(done => {
      chai
        .request(app)
        .post("/users/register")
        .send(user_biasa)
        .then(res => {
          user_biasa._id = res.body._id;
          user_biasa._picture = res.body.picture;
          user_biasa.token = mockLogin(user_biasa);
          done();
        })
        .catch(err => {
          console.log(JSON.stringify(err, undefined, 2));
        });
    });
    describe(`
`, () => {
      before(done => {
        chai
          .request(app)
          .post("/products")
          .send(mock_product)
          .set("token", admin.token)
          .then(res => {
            mock_product._id = res.body._id;
            done();
          })
          .catch(err => {});
      });
      it(`
          WITH [ INVALID ] TOKEN - SHOW ERROR
        `, done => {
        //
        chai
          .request(app)
          .delete(path + "/" + mock_product._id)
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

      it(`
          WITH [ VALID ] TOKEN - SHOW ERROR
        `, done => {
        //
        chai
          .request(app)
          .delete(path + "/" + mock_product._id)
          .set("token", user_biasa.token)
          .then(res => {
            expect(res).to.have.status(401);

            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.be.an("string");
            expect(res.body.message).to.equal("You have no access to do this");
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
    });
  });
});
