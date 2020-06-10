const axios = require("axios").default;

function get(url = "http", address = "Dronning Astrids Gate") {
  return url + address;
}

export { get };
