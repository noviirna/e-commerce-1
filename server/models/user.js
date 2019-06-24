const mongoose = require("mongoose");
const { Schema } = mongoose;
const { hashPassword } = require("../helpers/password");

const UserSchema = new Schema({
  name: String,
  picture: String,
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [
      {
        validator: function(email) {
          let re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(email).toLowerCase());
        },
        message: "Please input valid email address"
      },
      {
        validator: function(email) {
          return this.model("User")
            .findOne({
              email
            })
            .then(result => {
              if (result) {
                return false;
              } else {
                return true;
              }
            })
            .catch(err => {
              return false;
            });
        },
        message: "That email already been used"
      }
    ]
  },
  password: {
    type: String,
    minlength: [8, "Password must consist of 8-16 characters"],
    maxlength: [16, "Password must consist of 8-16 characters"],
    required: [true, "Password is required"]
  }
});

UserSchema.pre("save", function(next) {
  this.password = hashPassword(this.password);
  if (!this.picture) {
    this.picture =
      "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2016%2F08%2F08%2F09%2F17%2Favatar-1577909_960_720.png&f=1";
  }
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
