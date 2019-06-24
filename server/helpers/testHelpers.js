const User = require(`../models/user`);

module.exports = {
  deleteAllUser: function() {
    if (process.env.NODE_ENV == "test") {
      User.deleteMany({})
        .then(deleted => {})
        .catch(err => {
          console.log("Error while deleting users");
        });
    }
  },
  createMockUser: function(user) {
    User.create(user)
      .then(created => {})
      .catch(err => {});
  }
};
