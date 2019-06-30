const app = require("../app");

const chai = require("chai"); // untuk pakai fungsi assertion chai
const chaiHttp = require("chai-http"); // untuk pakai chai request http
const expect = chai.expect; // untuk pakai fungsi expect di chai
chai.should(); // untuk pakai fungsi should
chai.use(chaiHttp); // untuk pakai chai HTTP

const path = "/carts";

const {
  deleteAllUser,
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

var user_palsu = {
  _id: "5d17193d2a9f780a800455e8",
  name: "anu",
  email: "anu@mail.com",
  picture: "ini gambar"
};

var token_user_palsu = "";

let cartID = "";

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
  status: "shipped",
  products: [],
  products_amount: 100,
  ship_address: "asdfgh",
  ship_city: "adffffff",
  ship_amount: 20000,
  ship_receipt: "resi",
  total: 900000,
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
PATCH ${path}
`, function() {
  before(() => {
    console.log("START ========================> PATCH /carts\n\n");
  });
  after(() => {
    console.log("\n\nEND ========================> PATCH /carts");
    deleteAllUser();
    deleteAllCart();
  });

  describe(`
1. CORRECT INPUT`, () => {
    describe(`
   
1.A. AUTHENTICATION AUTHORIZATION TEST
`, () => {
      //
      before(function(done) {
        this.timeout(20000)
        chai
          .request(app)
          .post("/users/register")
          .send(admin)
          .then(res => {
            admin._id = res.body._id;
            admin._picture = res.body.picture;
            admin.token = mockLogin(admin);
            chai
              .request(app)
              .post("/users/register")
              .send(user_biasa)
              .then(res => {
                user_biasa._id = res.body._id;
                user_biasa._picture = res.body.picture;
                user_palsu._picture = res.body.picture;
                cart_1.buyer = res.body._id;
                token_user_palsu = mockLogin(user_palsu);
                user_biasa.token = mockLogin(user_biasa);
                done();
              })
              .catch(err => {
                console.log(JSON.stringify(err, undefined, 2));
              });
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
      describe(`
        ACCESS AS ADMIN
        `, () => {
        before(function(done) {
          this.timeout(10000)
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
          [ VALID ] TOKEN WITH CORRECT INPUT PARAMETERS
        `, done => {
          //
          chai
            .request(app)
            .patch(path + "/" + cartID)
            .send(cart_2)
            .set("token", admin.token)
            .then(res => {
              expect(res).to.have.status(200);
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
              done();
            })
            .catch(err => {
              console.log(JSON.stringify(err, undefined, 2));
            });
        });

        it(`
          [ INVALID ] TOKEN WITH CORRECT INPUT PARAMETERS - SHOW ERROR
        `, done => {
          //
          chai
            .request(app)
            .patch(path + "/" + cartID)
            .send(cart_2)
            .set("token", "admin.token")
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
      //
      describe(`
        ACCESS AS AUTHORIZED USER`, function() {
          this.timeout(10000)
        it(`
              [ VALID ]  TOKEN WITH CORRECT INPUT PARAMETERS
          `, done => {
          chai
            .request(app)
            .patch(path + "/" + cartID)
            .send(cart_2)
            .set("token", user_biasa.token)
            .then(res => {
              expect(res).to.have.status(200);
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
              done();
            })
            .catch(err => {
              console.log(JSON.stringify(err, undefined, 2));
            });
        });

        it(`
              [ INVALID ]  TOKEN WITH CORRECT INPUT PARAMETERS - SHOW ERROR
          `, done => {
          chai
            .request(app)
            .patch(path + "/" + cartID)
            .send(cart_2)
            .set("token", "user_biasa.token")
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
      //
      describe(`
        ACCESS AS UNAUTHORIZED USER`, () => {
        it(`
              [ VALID ]  TOKEN WITH CORRECT INPUT PARAMETERS
          `, done => {
          chai
            .request(app)
            .patch(path + "/" + cartID)
            .send(cart_2)
            .set("token", token_user_palsu)
            .then(res => {
              expect(res).to.have.status(401);
              expect(res.body).to.be.an("object");
              expect(res.body).to.have.property("message");
              expect(res.body.message).to.be.an("string");
              expect(res.body.message).to.equal(
                "You have no access to do this"
              );

              done();
            })
            .catch(err => {
              console.log(JSON.stringify(err, undefined, 2));
            });
        });

        it(`
              [ INVALID ]  TOKEN WITH CORRECT INPUT PARAMETERS - SHOW ERROR
          `, done => {
          chai
            .request(app)
            .patch(path + "/" + cartID)
            .send(cart_2)
            .set("token", "user_biasa.token")
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
      //
    });

    describe(`
1.B. DATA ACCURATION - TEST REQUEST VALUE HAD TO BE EQUAL AS RESPONSE VALUE
    `, () => {
      it(`
        RESPONSE VALUE IS SAME AS REQUEST VALUE
          `, done => {
        //
        chai
          .request(app)
          .patch(path + "/" + cartID)
          .send(cart_2)
          .set("token", user_biasa.token)
          .then(res => {
            expect(res).to.have.status(200);
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

            expect(res.body.status).to.equal(cart_2.status);
            expect(res.body.products).to.deep.equal(cart_2.products);
            expect(res.body.products_amount).to.equal(cart_2.products_amount);
            expect(res.body.ship_address).to.equal(cart_2.ship_address);
            expect(res.body.ship_city).to.equal(cart_2.ship_city);
            expect(res.body.ship_amount).to.equal(cart_2.ship_amount);
            expect(res.body.ship_receipt).to.equal(cart_2.ship_receipt);
            expect(res.body.total).to.equal(cart_2.total);
            expect(res.body.transfer_receipt).to.equal(cart_2.transfer_receipt);
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
    });

    describe(`
    2. FALSE INPUT`, () => {
      describe(`
      2.A. REQUIRED VALIDATION IN MODEL
        `, () => {
        it(`
          THE INPUT IS AN EMPTY OBJECT SHOW NO ERROR
            `, done => {
          //
          chai
            .request(app)
            .patch(path + "/" + cartID)
            .send({})
            .set("token", user_biasa.token)
            .then(res => {
              expect(res).to.have.status(200);
              done();
            })
            .catch(err => {
              console.log(JSON.stringify(err, undefined, 2));
            });
        });
        it(`
          THE REQUIRED KEY IS EMPTY SHOW ERROR
            `, done => {
          //
          chai
            .request(app)
            .patch(path + "/" + cartID)
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
      });
      describe(`
      2.B. DATA TYPE VALIDATION IN MODEL
        `, () => {
        it(`
          INPUT WITH WRONG DATA TYPE - SHOW ERROR
            `, done => {
          //
          chai
            .request(app)
            .patch(path + "/" + cartID)
            .send(cart_validation_datatype)
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
        MIN VALUE VALIDATION
          `, done => {
          //
          chai
            .request(app)
            .patch(path + "/" + cartID)
            .send(cart_validation_minValue)
            .set("token", user_biasa.token)
            .then(res => {
              expect(res).to.have.status(400);
              expect(res.body).to.be.an("object");
              expect(res.body).to.have.property("message");
              expect(res.body.message).to.be.an("string");
              expect(res.body.message).to.equal(
                "Total must be equal or greater by 0, Ship amount must be equal or greater by 0, Amount must be equal or greater by 0"
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
});
