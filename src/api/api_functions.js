const axios = require("axios").default;

let config = {
  headers: {
    accept: "application/json",
  },
};

function get(endepunkt, params) {
  var url = "https://ws.geonorge.no/adresser/v1" + endepunkt;

  return axios.get(url, { params }, config);
}

export { get };
