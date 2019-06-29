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
  tags: []
};

var updValue_1 = {
  name: "update",
  picture: "update",
  stock: 90,
  price: 20000,
  description: "update",
  tags: ["update"]
};

var updValue_2 = {
  picture: "picture",
  stock: "aaaaa",
  price: 20000,
  description: "update",
  tags: ["update 2"]
};

var updValue_3 = {
  name: null,
  picture: "",
  stock: 200,
  price: 20000,
  description: "update",
  tags: ["update 2"]
};

var updValue_4 = {
  name: "ajkl",
  picture: "adfaf",
  stock: -200,
  price: 20000,
  description: "update",
  tags: ["update 2"]
};

var updValue_5 = {
  name: {},
  picture: "adfaf",
  stock: 200,
  price: 20000,
  description: "update",
  tags: ""
};

var updValue_6 = {
  name: "ajkl",
  picture: "adfaf",
  stock: 200,
  price: 20000,
  description: "update",
  tags: {}
};

var updValue_7 = {
  name: "ajkl",
  picture: "adfaf",
  stock: 200,
  price: 20000,
  description: ["update"],
  tags: ""
};

describe(`
UPDATE ${path}
`, () => {
  before(() => {
    console.log("START ========================> UPDATE /products\n\n");
  });
  after(() => {
    console.log("\n\nEND ========================> UPDATE /products");
    deleteAllUser();
    deleteAllProduct();
  });

  describe(`
UPDATE PRODUCT`, () => {
    before(done => {
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

      describe("AUTHENTICATION", () => {
        it(`
        AS ADMIN  WITH [ INVALID ] TOKEN - SHOW ERROR 401
          `, done => {
          //
          chai
            .request(app)
            .patch(path + "/" + mock_product._id)
            .send(updValue_1)
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
        AS ADMIN WITH [ VALID ] TOKEN - STATUS 201 AND OUTPUT IS THE UPDATED VALUE
      `, done => {
          //
          chai
            .request(app)
            .patch(path + "/" + mock_product._id)
            .send(updValue_1)
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
              expect(res.body.tags).to.be.an("array");

              done();
            })
            .catch(err => {
              console.log(JSON.stringify(err, undefined, 2));
            });
        });

        it(`
        AS AUTHORIZED USER WITH [ INVALID ] TOKEN - SHOW ERROR 401
      `, done => {
          //
          chai
            .request(app)
            .patch(path + "/" + mock_product._id)
            .send(updValue_1)
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
        AS AUTHORIZED USER WITH [ VALID ] TOKEN & VALID DATA - SHOW ERROR 401
      `, done => {
          //
          chai
            .request(app)
            .patch(path + "/" + mock_product._id)
            .set("token", user_biasa.token)
            .send(mock_product)
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

      describe("PRODUCT ID NOT EXIST", () => {
        it(`
        REFER TO WRONG PRODUCT ID - SHOW ERROR 404
      `, done => {
          //
          chai
            .request(app)
            .patch(path + "/" + "THISISAFAKEID")
            .set("token", admin.token)
            .send(mock_product)
            .then(res => {
              expect(res).to.have.status(404);
              expect(res.body).to.be.an("object");
              expect(res.body).to.have.property("message");
              expect(res.body.message).to.be.an("string");
              expect(res.body.message).to.equal("Product didnt exist");
              done();
            })
            .catch(err => {
              console.log(JSON.stringify(err, undefined, 2));
            });
        });
      });

      describe("WRONG INPUT - ALL VALIDATION TESTED", () => {
        it(`
        INPUT IS IN WRONG FORMAT WRONG DATA TYPE HARUSNYA NUMBER DIISI STRING
      `, done => {
          //
          chai
            .request(app)
            .patch(path + "/" + mock_product._id)
            .send(updValue_2)
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

        it(`
        INPUT IS IN WRONG FORMAT, REQUIRED DATA IS NULL AND EMPTY STRING
      `, done => {
          //
          chai
            .request(app)
            .patch(path + "/" + mock_product._id)
            .send(updValue_3)
            .set("token", admin.token)
            .then(res => {
              expect(res).to.have.status(400);
              expect(res.body).to.be.an("object");
              expect(res.body).to.have.property("message");
              expect(res.body.message).to.be.an("string");
              expect(res.body.message).to.equal(
                "Picture is required, Name is required"
              );
              done();
            })
            .catch(err => {
              console.log(JSON.stringify(err, undefined, 2));
            });
        });

        it(`
        INPUT IS IN WRONG FORMAT, VALUE FOR IS LESS THAN MIN VALIDATION
      `, done => {
          //
          chai
            .request(app)
            .patch(path + "/" + mock_product._id)
            .send(updValue_4)
            .set("token", admin.token)
            .then(res => {
              expect(res).to.have.status(400);
              expect(res.body).to.be.an("object");
              expect(res.body).to.have.property("message");
              expect(res.body.message).to.be.an("string");
              expect(res.body.message).to.equal(
                "Stock must be equal or greater by 0"
              );
              done();
            })
            .catch(err => {
              console.log(JSON.stringify(err, undefined, 2));
            });
        });

        it(`
        INPUT IS IN WRONG FORMAT, WRONG DATA TYPE HARUSNYA STRING DIISI OBJECT
      `, done => {
          //
          chai
            .request(app)
            .patch(path + "/" + mock_product._id)
            .send(updValue_5)
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

        it(`
        INPUT IS IN WRONG FORMAT, WRONG DATA TYPE HARUSNYA ARRAY OF STRING TAPI INI DIISI OBJECT
      `, done => {
          //
          chai
            .request(app)
            .patch(path + "/" + mock_product._id)
            .send(updValue_6)
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

        it(`
        INPUT IS IN WRONG FORMAT, WRONG DATA TYPE HARUSNYA ARRAY OF STRING TAPI INI DIISI ARRAY
      `, done => {
          //
          chai
            .request(app)
            .patch(path + "/" + mock_product._id)
            .send(updValue_7)
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
    });
  });
});
