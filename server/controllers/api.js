const axios = require("axios");

class ControllerAPI {
  static getCities(req, res, next) {
    axios({
      method: "GET",
      url: "https://api.rajaongkir.com/starter/city",
      headers: {
        key: process.env.RAJAONGKIR
      }
    })
      .then(({ data }) => {
        res.status(200).json(data.rajaongkir.results);
      })
      .catch(next);
  }

  static getOngkir(req, res, next) {
    axios({
      method: "POST",
      url: `https://api.rajaongkir.com/starter/cost`,
      data: {
        origin: 151,
        destination: req.body.destination,
        weight: Number(req.body.weight),
        courier: "jne"
      },
      headers: {
        key: process.env.RAJAONGKIR
      }
    })
      .then(({ data }) => {
        res.status(200).json(data.rajaongkir.results);
      })
      .catch(next);
  }
}

module.exports = ControllerAPI;
