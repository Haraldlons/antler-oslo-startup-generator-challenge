import { get } from "/api/api_functions.js";

function searchAddress(adresseTekst) {
  const endepunkt = "/sok";
  const params = {
    sok: adresseTekst,
    treffPerSide: 100,
    side: 0,
    asciiKompatibel: true,
  };
  return get(endepunkt, params);
}

function getNearbyAddresses(lon, lat) {
  const endepunkt = "/punktsok";
  const params = {
    radius: 500,
    lat: lat,
    lon: lon,
    treffPerSide: 100,
    side: 0,
    asciiKompatibel: true,
  };
  return get(endepunkt, params);
}

export { searchAddress, getNearbyAddresses };
