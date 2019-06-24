module.exports = function(err, req, res, next) {
  if (err.code) {
    // handle error dari controller
    res.status(err.code).json({ message: err.message });
  } else if (err.name === "ValidationError") {
    // let message = err.message.split(": ")[2];
    let message = err.message.replace("User validation failed: ", "");
    if ("email: ".indexOf(message)) {
      message = message.replace("email: ", "");
    }
    if ("password: ".indexOf(message)) {
      message = message.replace("password: ", "");
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
