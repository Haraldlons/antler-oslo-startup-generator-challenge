import { get } from "/api/api_functions.js";

function searchAddress(address) {
  return get("www.vg.no", address);
}

export { searchAddress };
