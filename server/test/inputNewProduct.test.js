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

var mock_product_1 = {
  name: "earrings",
  picture: "picture of earrings",
  stock: 20,
  price: 1000000,
  description: "earrings description",
  tags: ["new"],
  likedby: []
};

describe(`
POST ${path}
`, () => {
  before(() => {
    console.log("START ========================> POST /products\n\n");
  });
  after(() => {
    console.log("\n\nEND ========================> POST /products");
    deleteAllUser();
    deleteAllProduct();
  });

  describe(`
1. CORRECT INPUT`, () => {
    describe(`
   
1.A. AUTHENTICATION AUTHORIZATION TEST
`, () => {
      describe(`
ACCESS AS ADMIN
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
          [ VALID ] TOKEN WITH CORRECT INPUT PARAMETERS
        `, done => {
          //
          chai
            .request(app)
            .post(path)
            .send(mock_product)
            .set("token", admin.token)
            .then(res => {
              expect(res).to.have.status(201);

              expect(res.body).to.be.an("object");

              expect(res.body).to.have.property("_id");
              expect(res.body).to.have.property("name");
              expect(res.body).to.have.property("picture");
              expect(res.body).to.have.property("stock");
              expect(res.body).to.have.property("price");
              expect(res.body).to.have.property("tags");
              expect(res.body).to.have.property("description");
              expect(res.body).to.have.property("likedby");

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
            .post(path)
            .send(mock_product)
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
ACCESS AS REGULAR USER`, () => {
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
        it(`
          [ VALID ]  TOKEN WITH CORRECT INPUT PARAMETERS - SHOW ERROR
              `, done => {
          //
          chai
            .request(app)
            .post(path)
            .send(mock_product)
            .set("token", user_biasa.token)
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
      });
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
          .post(path)
          .send(mock_product_1)
          .set("token", admin.token)
          .then(res => {
            expect(res).to.have.status(201);

            expect(res.body).to.be.an("object");

            expect(res.body.name).to.equal(mock_product_1.name);
            expect(res.body.picture).to.equal(mock_product_1.picture);
            expect(res.body.stock).to.equal(mock_product_1.stock);
            expect(res.body.price).to.equal(mock_product_1.price);
            expect(res.body.description).to.equal(mock_product_1.description);
            expect(res.body.likedby)
              .to.be.an("array")
              .with.lengthOf(0);
            expect(res.body.tags)
              .to.be.an("array")
              .with.lengthOf(1);
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
  2.A. REQUIRED VALIDATION IN MODEL
    `, () => {
      it(`
      THE INPUT IS AN EMPTY OBJECT - SHOW ERROR
        `, done => {
        //
        chai
          .request(app)
          .post(path)
          .send({})
          .set("token", admin.token)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.be.an("string");
            expect(res.body.message).equal(
              "Description is required, Price have to be defined, Stock have to be defined, Picture is required, Name is required"
            );
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
      it(`
      INPUT IS MISSING "name" (REQUIRED KEY) - SHOW ERROR
        `, done => {
        //
        chai
          .request(app)
          .post(path)
          .send({
            picture: "picture of earrings",
            stock: 20,
            price: 1000000,
            description: "earrings description",
            tags: ["new"],
            likedby: []
          })
          .set("token", admin.token)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.be.an("string");
            expect(res.body.message).equal("Name is required");
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
      it(`
      INPUT IS MISSING "tags" and "likedby" (NOT A REQUIRED KEY)
        `, done => {
        //
        chai
          .request(app)
          .post(path)
          .send({
            name: "earrings",
            picture: "picture of earrings",
            stock: 20,
            price: 1000000,
            description: "earrings description"
          })
          .set("token", admin.token)
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an("object");
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
            expect(res.body.name).to.equal("earrings");
            expect(res.body.picture).to.equal("picture of earrings");
            expect(res.body.stock).to.equal(20);
            expect(res.body.price).to.equal(1000000);
            expect(res.body.description).to.equal("earrings description");
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
    describe(`
  2.B. DATA TYPE VALIDATION IN MODEL
    `, () => {
      it(`
      INPUT WITH WRONG DATA TYPE - SHOW ERROR
        `, done => {
        //
        chai
          .request(app)
          .post(path)
          .send({
            name: 90,
            picture: ["picture of earrings"],
            stock: { stock: 20 },
            price: "1000000",
            description: { descrption: "earrings description" },
            tags: "new",
            likedby: { user: [] }
          })
          .set("token", admin.token)
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
  2.C. NULL VALIDATION IN MODEL
      `, () => {
      it(`
      SOME OF REQUIRED KEY IS NULL - SHOW ERROR
        `, done => {
        //
        chai
          .request(app)
          .post(path)
          .send({
            name: null,
            picture: null,
            stock: 20,
            price: 1000000,
            description: "earrings description"
          })
          .set("token", admin.token)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res).to.have.property("error");
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.be.an("string");
            expect(res.body.message).to.equal(
              "Name is required, Picture is required"
            );
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
      it(`
      SOME OF NOT REQUIRED KEY IS NULL
        `, done => {
        //
        chai
          .request(app)
          .post(path)
          .send({
            name: "null",
            picture: "null",
            stock: 20,
            price: 1000000,
            description: "null description",
            tags: null,
            likedby: null
          })
          .set("token", admin.token)
          .then(res => {
            expect(res).to.have.status(201);

            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
    });
  });
});
