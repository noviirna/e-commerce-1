module.exports = function(err, req, res, next) {
  if (err.code) {
    // handle error dari controller
    res.status(err.code).json({ message: err.message });
  } else if (err.name === "ValidationError") {
    let { message } = err;
    let arr = [
      "User validation failed: ",
      "email: ",
      "password: ",
      "Product validation failed: ",
      "description: ",
      "price: ",
      "stock: ",
      "picture: ",
      "name: "
    ];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].indexOf(message)) {
        message = message.replace(arr[i], "");
      }
    }
    res.status(400).json({ message: message });
  } else if (err.response.status) {
    // handle error axios
    res.status(err.response.status).json({ message: err.response.statusText });
  } else {
    // handle error yang ga diketahui asal muasalnya
    res.status(500).json({ message: "internal server error" });
  }
};
