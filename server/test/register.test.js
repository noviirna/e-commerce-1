const app = require("../app");

const chai = require("chai"); // untuk pakai fungsi assertion chai
const chaiHttp = require("chai-http"); // untuk pakai chai request http
const expect = chai.expect; // untuk pakai fungsi expect di chai
chai.should(); // untuk pakai fungsi should
chai.use(chaiHttp); // untuk pakai chai HTTP

const path = "/users/register";

const { deleteAllUser } = require("../helpers/testHelpers");

const user_correct = {
  name: "novi",
  email: "novi.irnawati@gmail.com",
  password: "12345678"
};

const user_wrong_email = {
  name: "novi",
  email: "irnawatigmail.com",
  password: "12345678"
};

const user_wrong_password_1 = {
  name: "novi",
  email: "irnawati@gmail.com",
  password: "1234567"
};

const user_wrong_password_2 = {
  name: "novi",
  email: "irnawati@gmail.com",
  password: "12345678901234567"
};

const user_wrong_email_password = {
  name: "novi",
  email: "irnawatigmail.com",
  password: "12345678901234567"
};

const user_no_email = {
  name: "novi",
  password: "12345678"
};

const user_no_password = {
  name: "novi",
  email: "novi.irnawati@gmail.com"
};

const user_no_email_password = {
  name: "novi"
};

describe(`
POST ${path}
`, () => {
  before(() => {
    deleteAllUser();
    console.log(
      "\n==================================\nTEST REGISTER START\n==================================\n"
    );
  });

  describe(`
1. CORRECT INPUT`, () => {
    describe(`
1.A. ALL INPUT IS CORRECT`, () => {
      it(`
    Request from client with req.body :
      ${JSON.stringify(user_correct)}
    Should return
    - response.status : 201
    - response.body : 
      { _id : String, name : String, email : String, password : String }`, done => {
        //
        chai
          .request(app)
          .post(path)
          .send(user_correct)
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("_id");
            expect(res.body).to.have.property("name");
            expect(res.body).to.have.property("email");
            expect(res.body).to.have.property("password");
            expect(res.body).to.have.property("picture");
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
    });
  });

  describe(`
2. WRONG INPUT`, () => {
    after(() => {
      deleteAllUser();
    });
    describe(`
2.A. WRONG EMAIL FORMAT`, () => {
      it(`
      Request from client with req.body :
        ${JSON.stringify(user_wrong_email)}
      Should return
      - response.status : 400
      - response.body :
        { message : "Please input valid email address" }`, done => {
        //
        chai
          .request(app)
          .post(path)
          .send(user_wrong_email)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res).to.have.property("error");
            expect(res).to.have.property("text");
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.equal(
              `Please input valid email address`
            );
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
    });

    describe(`
2.B. WRONG PASSWORD LENGTH - PASSWORD LENGTH LESS THAN 8`, () => {
      it(`
      Request from client with req.body :
        ${JSON.stringify(user_wrong_password_1)}
      Should return
      - response.status : 400
      - response.body :
        { message : "Password must consist of 8-16 characters" }`, done => {
        //
        chai
          .request(app)
          .post(path)
          .send(user_wrong_password_1)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res).to.have.property("error");
            expect(res).to.have.property("text");
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.equal(
              `Password must consist of 8-16 characters`
            );
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
    });

    describe(`
2.C WRONG PASSWORD LENGTH - PASSWORD LENGTH MORE THAN 8`, () => {
      it(`
        Request from client with req.body :
          ${JSON.stringify(user_wrong_password_2)}
        Should return
        - response.status : 400
        - response.body :
          { message : "Password must consist of 8-16 characters" }`, done => {
        //
        chai
          .request(app)
          .post(path)
          .send(user_wrong_password_2)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res).to.have.property("error");
            expect(res).to.have.property("text");
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.equal(
              `Password must consist of 8-16 characters`
            );
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
    });

    describe(`
2.D. WRONG EMAIL & PASSWORD LENGTH`, () => {
      it(`
    Request from client with req.body :
      ${JSON.stringify(user_wrong_email_password)}
    Should return
    - response.status : 400
    - response.body : 
      { message : "Please input valid email address, Password must consist of 8-16 characters" }`, done => {
        //
        chai
          .request(app)
          .post(path)
          .send(user_wrong_email_password)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res).to.have.property("error");
            expect(res).to.have.property("text");
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.equal(
              "Please input valid email address, Password must consist of 8-16 characters"
            );
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
    });

    describe(`
2.E. REGISTER WITH THE SAME EMAIL TWICE`, () => {
      it(`
    Request from client with req.body :
      ${JSON.stringify(user_correct)}
    Should return
    - response.status : 400
    - response.body : 
      { message : "That email already been used" }`, done => {
        //
        chai
          .request(app)
          .post(path)
          .send(user_correct)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res).to.have.property("error");
            expect(res).to.have.property("text");
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.equal(`That email already been used`);
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
    });
  });

  describe(`
3. INPUT IS NOT COMPLETE`, () => {
    describe(`
3.A. NO EMAIL`, () => {
      it(`
      Request from client with req.body :
        ${JSON.stringify(user_no_email)}
      Should return
      - response.status : 400
      - response.body :
        { message : "Email is required" }`, done => {
        //
        chai
          .request(app)
          .post(path)
          .send(user_no_email)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res).to.have.property("error");
            expect(res).to.have.property("text");
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.equal(`Email is required`);
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
    });

    describe(`
3.B. NO PASSWORD`, () => {
      it(`
      Request from client with req.body :
        ${JSON.stringify(user_no_password)}
      Should return
      - response.status : 400
      - response.body :
        { message : "Password is required" }`, done => {
        //
        chai
          .request(app)
          .post(path)
          .send(user_no_password)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res).to.have.property("error");
            expect(res).to.have.property("text");
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.equal(`Password is required`);
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
    });

    describe(`
3.C. NO EMAIL & PASSWORD`, () => {
      it(`
      Request from client with req.body :
        ${JSON.stringify(user_no_email_password)}
      Should return
      - response.status : 400
      - response.body :
        { message : "Password is required, Email is required" }`, done => {
        //
        chai
          .request(app)
          .post(path)
          .send(user_no_email_password)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res).to.have.property("error");
            expect(res).to.have.property("text");
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.equal(
              `Password is required, Email is required`
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
