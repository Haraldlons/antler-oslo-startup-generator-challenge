const axios = require("axios").default;

let config = {
  headers: {
    accept: "application/json",
  },
};
const params = {
  sok: "Hestehagen 47",
  treffPerSide: 10,
  side: 0,
  asciiKompatibel: true,
};
function get(url = "http", address = "Dronning Astrids Gate") {
  url = "https://ws.geonorge.no/adresser/v1/sok";
  return axios.get(url, { params }, config);
}

function get2() {
  var url =
    "https://ws.geonorge.no/adresser/v1/punktsok?radius=200&lat=59.84238166280191&lon=10.47432903744205&treffPerSide=10&side=0&asciiKompatibel=true";
  return axios.get(url, config);
}

export { get, get2 };
