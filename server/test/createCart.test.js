const app = require("../app");

const chai = require("chai"); // untuk pakai fungsi assertion chai
const chaiHttp = require("chai-http"); // untuk pakai chai request http
const expect = chai.expect; // untuk pakai fungsi expect di chai
chai.should(); // untuk pakai fungsi should
chai.use(chaiHttp); // untuk pakai chai HTTP

const path = "/carts";

const {
  deleteAllUser,
  deleteAllProduct,
  deleteAllCart,
  mockLogin
} = require("../helpers/testHelpers");

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

var cart_2 = {
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

var cart_validation_required = {
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

var cart_validation_status = {
  buyer: "",
  status: "lkkkkkkkkk",
  products: [],
  products_amount: 1,
  ship_address: "aldjf",
  ship_city: "adffffff",
  ship_amount: 20000,
  ship_receipt: "resi",
  total: 0,
  transfer_receipt: ""
};

var cart_validation_datatype = {
  buyer: "",
  status: "lkkkkkkkkk",
  products: [],
  products_amount: {},
  ship_address: 123,
  ship_city: [],
  ship_amount: "aaaa",
  ship_receipt: 00,
  total: 0,
  transfer_receipt: ""
};

var cart_validation_minValue = {
  buyer: "",
  status: "checkout",
  products: [],
  products_amount: -10,
  ship_address: "123",
  ship_city: "",
  ship_amount: -10,
  ship_receipt: "",
  total: -100,
  transfer_receipt: ""
};

describe(`
POST ${path}
`, () => {
  before(() => {
    console.log("START ========================> POST /carts\n\n");
  });
  after(() => {
    console.log("\n\nEND ========================> POST /carts");
    deleteAllUser();
    deleteAllProduct();
    deleteAllCart();
  });

  describe(`
1. CORRECT INPUT`, () => {
    describe(`
   
1.A. AUTHENTICATION AUTHORIZATION TEST
`, () => {
      describe(`
ACCESS AS REGULAR USER`, () => {
        before(done => {
          chai
            .request(app)
            .post("/users/register")
            .send(user_biasa)
            .then(res => {
              user_biasa._id = res.body._id;
              cart_1.buyer = res.body._id;
              cart_2.buyer = res.body._id;
              cart_validation_status.buyer = res.body._id;
              cart_validation_datatype.buyer = res.body._id;
              cart_validation_minValue.buyer = res.body._id;
              user_biasa._picture = res.body.picture;
              user_biasa.token = mockLogin(user_biasa);
              done();
            })
            .catch(err => {
              console.log(JSON.stringify(err, undefined, 2));
            });
        });
        it(`
          [ VALID ]  TOKEN WITH CORRECT INPUT PARAMETERS - NO ERROR
              `, done => {
          //
          chai
            .request(app)
            .post(path)
            .send(cart_1)
            .set("token", user_biasa.token)
            .then(res => {
              expect(res).to.have.status(201);
              expect(res.body).to.be.an("object");
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
          [ INVALID ]  TOKEN WITH CORRECT INPUT PARAMETERS - SHOW ERROR
              `, done => {
          //
          chai
            .request(app)
            .post(path)
            .send(cart_1)
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
    });

    describe(`
    1.B. DATA ACCURATION - TEST REQUEST VALUE HAD TO BE EQUAL AS RESPONSE VALUE
    `, () => {
      it(`
          REQUEST BODY VALUE MUST BE SAME AS RESPONSE BODY VALUE
              `, done => {
        //
        chai
          .request(app)
          .post(path)
          .send(cart_1)
          .set("token", user_biasa.token)
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("_id");
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

            expect(res.body.buyer).to.equal(cart_1.buyer);
            expect(res.body.status).to.equal(cart_1.status);
            expect(res.body.products).to.deep.equal(cart_1.products);
            expect(res.body.products_amount).to.equal(cart_1.products_amount);
            expect(res.body.ship_address).to.equal(cart_1.ship_address);
            expect(res.body.ship_city).to.equal(cart_1.ship_city);
            expect(res.body.ship_amount).to.equal(cart_1.ship_amount);
            expect(res.body.ship_receipt).to.equal(cart_1.ship_receipt);
            expect(res.body.total).to.equal(cart_1.total);
            expect(res.body.transfer_receipt).to.equal(cart_1.transfer_receipt);
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
    });
  });

  describe(`
  2. FALSE INPUT`, () => {
    describe(`
    CHECK ALL ERROR FOR VALIDATION IF INPUT IS WRONG
      `, () => {
      it(`
        THE INPUT IS AN EMPTY OBJECT - SHOW ERROR
        SHOULD RETURN STATUS 400
          `, done => {
        //
        chai
          .request(app)
          .post(path)
          .send({})
          .set("token", user_biasa.token)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.be.an("string");
            expect(res.body.message).to.equal("Input is not complete");

            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
      it(`
        THE REQUIRED KEY ( buyer ) IS EMPTY STRING
        SHOULD RETURN STATUS 400
          `, done => {
        //
        chai
          .request(app)
          .post(path)
          .send(cart_validation_required)
          .set("token", user_biasa.token)
          .then(res => {
            expect(res).to.have.status(400);
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
        CUSTOM VALIDATION FOR ( status ), only accept "checkout" / "transfer" / "shippped" / "confirmed" / "received"
        SHOULD RETURN STATUS 400
          `, done => {
        //
        chai
          .request(app)
          .post(path)
          .send(cart_validation_status)
          .set("token", user_biasa.token)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.be.an("string");
            expect(res.body.message).to.equal("Invalid input");
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });

      it(`
        MIN VALUE VALIDATION FOR  ALL KEY WITH MIN VALUE
        SHOULD RETURN STATUS 400
          `, done => {
        //
        chai
          .request(app)
          .post(path)
          .send(cart_validation_minValue)
          .set("token", user_biasa.token)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.be.an("string");
            expect(res.body.message).to.equal(
              "Amount must be equal or greater by 0, Ship amount must be equal or greater by 0, Total must be equal or greater by 0"
            );
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
    });
  });
});
