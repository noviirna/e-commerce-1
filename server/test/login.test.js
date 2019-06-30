const app = require("../app");

const chai = require("chai"); // untuk pakai fungsi assertion chai
const chaiHttp = require("chai-http"); // untuk pakai chai request http
const expect = chai.expect; // untuk pakai fungsi expect di chai
chai.should(); // untuk pakai fungsi should
chai.use(chaiHttp); // untuk pakai chai HTTP

const User = require("../models/user");

const path = "/users/login";

const { deleteAllUser, createMockUser } = require("../helpers/testHelpers");

const correctEmail = "novi.irnawati@gmail.com";
const correctPassword = "12345678";
const wrongEmail = "irnawati@gmail.com";
const wrongPassword = "87654321";

const user_correct = {
  email: correctEmail,
  password: correctPassword
};

const user_wrong_email = {
  email: wrongEmail,
  password: correctPassword
};

const user_wrong_password = {
  email: correctEmail,
  password: wrongPassword
};

const user_wrong_email_password = {
  email: wrongPassword,
  password: wrongEmail
};

const user_no_email = {
  password: correctPassword
};

const user_no_password = {
  email: correctEmail
};
const user_no_email_password = {};

describe.only(`
POST ${path}
`, () => {
  before(done => {
    console.log(
      "\n==================================\nTEST LOGIN START\n==================================\n"
    );
    done();
  });

  after(done => {
    deleteAllUser();
    console.log(
      "\n====================================================================\n"
    );
    done();
  });

  describe(`
1. CORRECT INPUT`, () => {
    describe(`
1.A. ALL INPUT IS CORRECT`, () => {
      before(done => {
        let user = user_correct;
        user.name = "novi";
        createMockUser(user);
        done();
      });
      it(`
    Request from client with req.body :
      ${JSON.stringify(user_correct)}
    Should return
    - response.status : 200
    - response.body : 
      { token : String, user : { _id : String, name : String, email : String } }`, done => {
        //
        chai
          .request(app)
          .post(path)
          .send(user_correct)
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("token");
            expect(res.body).to.have.property("user");
            expect(res.body.token).to.be.an("string");
            expect(res.body.user).to.be.an("object");
            expect(res.body.user).to.have.property("_id");
            expect(res.body.user).to.have.property("email");
            expect(res.body.user).to.have.property("name");
            expect(res.body.user).to.have.property("picture");

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
    describe(`
2.A. WRONG EMAIL`, () => {
      it(`
        Request from client with req.body :
          ${JSON.stringify(user_wrong_email)}
        Should return
        - response.status : 400
        - response.body :
          { message : "Password / Email is wrong" }`, done => {
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
            expect(res.body.message).to.equal(`Password / Email is wrong`);
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
    });

    describe(`
2.B. WRONG PASSWORD`, () => {
      it(`
          Request from client with req.body :
            ${JSON.stringify(user_wrong_password)}
          Should return
          - response.status : 400
          - response.body :
            { message : "Password / Email is wrong" }`, done => {
        //
        chai
          .request(app)
          .post(path)
          .send(user_wrong_password)
          .then(res => {
            expect(res).to.have.status(400);
            expect(res).to.have.property("error");
            expect(res).to.have.property("text");
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("message");
            expect(res.body.message).to.equal(`Password / Email is wrong`);
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
    });

    describe(`
2.C. WRONG EMAIL & PASSWORD`, () => {
      it(`
          Request from client with req.body :
            ${JSON.stringify(user_wrong_email_password)}
          Should return
          - response.status : 400
          - response.body :
            { message : "Password / Email is wrong" }`, done => {
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
            expect(res.body.message).to.equal(`Password / Email is wrong`);
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
          { message : "Complete the log in form" }`, done => {
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
            expect(res.body.message).to.equal(`Complete the log in form`);
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
            { message : "Complete the log in form" }`, done => {
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
            expect(res.body.message).to.equal(`Complete the log in form`);
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
    });

    describe(`
2.C. WRONG EMAIL & PASSWORD`, () => {
      it(`
          Request from client with req.body :
            ${JSON.stringify(user_no_email_password)}
          Should return
          - response.status : 400
          - response.body :
            { message : "Complete the log in form" }`, done => {
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
            expect(res.body.message).to.equal(`Complete the log in form`);
            done();
          })
          .catch(err => {
            console.log(JSON.stringify(err, undefined, 2));
          });
      });
    });
  });
});
