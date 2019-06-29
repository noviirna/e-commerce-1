const app = require("../app");

const chai = require("chai"); // untuk pakai fungsi assertion chai
const chaiHttp = require("chai-http"); // untuk pakai chai request http
const expect = chai.expect; // untuk pakai fungsi expect di chai
const ObjectID = require("mongodb").ObjectID;
chai.should(); // untuk pakai fungsi should
chai.use(chaiHttp); // untuk pakai chai HTTP

const path = "/carts";

var cartID = "";

const {
  deleteAllUser,
  deleteAllCart,
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

var user_palsu = {
  _id: ObjectID("5d17193d2a9f780a800455e8"),
  name: "anu",
  email: "anu@mail.com",
  picture: "ini gambar"
};

let token_user_palsu = mockLogin(user_palsu);

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
GET ${path}
`, () => {
  before(done => {
    deleteAllProduct();
    deleteAllUser();
    deleteAllCart();
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
  after(done => {
    console.log("\n\nEND ========================> GET /carts");
    deleteAllUser();
    deleteAllProduct();
    deleteAllCart();
    done();
  });

  describe(`
AUTHENTICATION TEST
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
        .catch(err => {
          console.log(JSON.stringify(err, undefined, 2));
        });
    });

    it(`
      GET ALL CARTS AS ADMIN (ADMIN ONLY)
        `, done => {
      //
      chai
        .request(app)
        .get(path)
        .set("token", admin.token)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body[0]).to.be.have.property("_id");

          done();
        })
        .catch(err => {
          console.log(JSON.stringify(err, undefined, 2));
        });
    });

    it(`
      GET ALL CARTS AS USER (ADMIN ONLY) - SHOW ERROR
        `, done => {
      //
      chai
        .request(app)
        .get(path)
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

    it(`
      GET USER CARTS AS ADMIN (ADMIN AND AUTHORIZED USER ONLY)
        `, done => {
      //
      chai
        .request(app)
        .get(path + "/user/" + cart_1.buyer)
        .set("token", admin.token)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body[0]).to.be.have.property("_id");

          done();
        })
        .catch(err => {
          console.log(JSON.stringify(err, undefined, 2));
        });
    });

    it(`
      GET USER CARTS AS AUTHORIZED USER (ADMIN AND AUTHORIZED USER ONLY)
        `, done => {
      //
      chai
        .request(app)
        .get(path + "/user/" + cart_1.buyer)
        .set("token", user_biasa.token)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body[0]).to.be.have.property("_id");
          done();
        })
        .catch(err => {
          console.log(JSON.stringify(err, undefined, 2));
        });
    });

    it(`
    GET SPECIFIC CART AS UNAUTHORIZED USER (ADMIN AND AUTHORIZED USER ONLY) - SHOW ERROR
      `, done => {
      //
      chai
        .request(app)
        .get("/carts/" + cartID)
        .set("token", token_user_palsu)
        .then(res => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.be.an("string");
          done();
        })
        .catch(err => {
          console.log(JSON.stringify(err, undefined, 2));
        });
    });
    it(`
    GET SPECIFIC CART AS ADMIN (ADMIN AND AUTHORIZED USER ONLY)
      `, done => {
      //
      chai
        .request(app)
        .get("/carts/" + cartID)
        .set("token", admin.token)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");
          done();
        })
        .catch(err => {
          console.log(JSON.stringify(err, undefined, 2));
        });
    });
    it(`
    GET SPECIFIC CART AS AUTHORIZED USER (ADMIN AND AUTHORIZED USER ONLY)
      `, done => {
      //
      chai
        .request(app)
        .get("/carts/" + cartID)
        .set("token", user_biasa.token)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");
          done();
        })
        .catch(err => {
          console.log(JSON.stringify(err, undefined, 2));
        });
    });
  });
});
