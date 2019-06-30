const app = require("../app");

const chai = require("chai"); // untuk pakai fungsi assertion chai
const chaiHttp = require("chai-http"); // untuk pakai chai request http
const expect = chai.expect; // untuk pakai fungsi expect di chai
chai.should(); // untuk pakai fungsi should
chai.use(chaiHttp); // untuk pakai chai HTTP

const User = require("../models/user");

const path = "/carts";

var cartID = "";

const {
  deleteAllUser,
  createMockUser,
  deleteAllCart,
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

var cart_1 = {
  buyer: "",
  status: "checkout",
  products: [],
  products_amount: 1,
  ship_address: "aldjf",
  ship_city: "adffffff",
  ship_amount: 20000,
  ship_receipt: "resi",
  total: 0,
  transfer_receipt: ""
};

describe(`
DELETE ${path}
`, function() {
  before(() => {
    console.log("START ========================> DELETE /carts\n\n");
  });
  after(() => {
    console.log("\n\nEND ========================> DELETE /carts");
    deleteAllUser();
    deleteAllCart();
  });

  this.timeout(10000)

  describe(`
DELETE CART AS ADMIN`, () => {
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
          .post("/users/register")
          .send(user_biasa)
          .then(res => {
            user_biasa._id = res.body._id;
            user_biasa._picture = res.body.picture;
            user_biasa.token = mockLogin(user_biasa);
            cart_1.buyer = res.body._id;
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });

      beforeEach(done => {
        chai
          .request(app)
          .post("/carts")
          .send(cart_1)
          .set("token", user_biasa.token)
          .then(res => {
            cartID = res.body._id;
            done();
          })
          .catch(err => {});
      });
      it(`
          DELETE CART WITH [ INVALID ] TOKEN - SHOW ERROR 401
        `, done => {
        //
        chai
          .request(app)
          .delete(path + "/" + cartID)
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
          DELETE CART WITH [ VALID ] TOKEN AND EXISTING DATA OUTPUT => STATUS 200 & REQ.BODY {DELETED DATA}
        `, done => {
        //
        chai
          .request(app)
          .delete(path + "/" + cartID)
          .set("token", admin.token)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("buyer");
            expect(res.body).to.have.property("status");
            expect(res.body).to.have.property("products");
            expect(res.body).to.have.property("products_amount");
            expect(res.body).to.have.property("ship_address");
            expect(res.body).to.have.property("ship_city");
            expect(res.body).to.have.property("ship_amount");
            expect(res.body).to.have.property("ship_receipt");
            expect(res.body).to.have.property("total");
            expect(res.body).to.have.property("transfer_receipt");
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });

      it(`
          DELETE CART WITH [ VALID ] TOKEN AND NON EXISTING DATA OUTPUT - SHOW ERROR 404
        `, done => {
        //
        chai
          .request(app)
          .delete(path + "/" + "5d170fa2cc135f78cf6ade89")
          .set("token", admin.token)
          .then(res => {
            console.log(res.body.message);
            expect(res).to.have.status(404);
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.be.an("string");
            expect(res.body.message).to.equal("Cart didnt exist");
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
    });
  });

  describe(`
  DELETE CART AS REGULAR USER`, () => {
    describe(`
  `, () => {
      before(done => {
        chai
          .request(app)
          .post("/carts")
          .send(cart_1)
          .set("token", user_biasa.token)
          .then(res => {
            cartID = res.body._id;
            done();
          })
          .catch(err => {});
      });
      it(`
            WITH [ INVALID ] TOKEN - SHOW ERROR 401
          `, done => {
        //
        chai
          .request(app)
          .delete(path + "/" + cartID)
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
            WITH [ VALID ] TOKEN - SHOW ERROR 401
          `, done => {
        //
        chai
          .request(app)
          .delete(path + "/" + cartID)
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
