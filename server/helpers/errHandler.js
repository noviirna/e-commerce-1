module.exports = function(err, req, res, next) {
  console.log(err);
  console.log(JSON.stringify(err, null, 2));
  if (err.code) {
    res.status(err.code).json({ message: err.message });
  } else if (err.name === "ValidationError" || err.name == "CastError") {
    let { message } = err;
    let arr = [
      "User validation failed: ",
      "email: ",
      "password: ",
      "Validation failed: ",
      "Product validation failed: ",
      "description: ",
      "price: ",
      "stock: ",
      "picture: ",
      "name: ",
      "Cart validation failed: ",
      "buyer: ",
      "products_amount: ",
      "ship_address: ",
      "ship_city: ",
      "total: ",
      "status: ",
      "ship_amount: "
    ];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].indexOf(message)) {
        message = message.replace(arr[i], "");
      }
    }
    console.log(message);
    res.status(400).json({ message });
  } else if (err.response.status) {
    res.status(err.response.status).json({ message: err.response.statusText });
  } else {
    res.status(500).json({ message: "internal server error" });
  }
};
