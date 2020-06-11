import { searchAddress } from "/api/api_service.js";
import { getNearbyAddresses } from "./api/api_service";
import { addWaypoint } from "./add_waypoint.js";
import { getRandomDate, getRandomPrice } from "./random.js";

var vectorLayer = new OpenLayers.Layer.Vector("Overlay");
var epsg4326 = new OpenLayers.Projection("EPSG:4326"); //WGS 1984 projection
var adresseTekst;

var adresseInput = document.getElementById("adresseInput");
adresseInput.oninput = function (params) {
  adresseTekst = params.srcElement.value;
  if (adresseTekst.length > 6) {
    searchAddress(adresseTekst).then((result) => {
      function createMenuItem(name) {
        let li = document.createElement("a");
        li.textContent = name;
        return li;
      }
      const menu = document.getElementById("myDropdown");
      menu.innerHTML = "";
      result.data.adresser.forEach((item, index) => {
        menu.appendChild(
          createMenuItem(
            item.adressetekst + ", " + item.postnummer + " - " + item.poststed
          )
        );
      });
    });
  }
};

var myLink = document.getElementById("sok");

myLink.onclick = function () {
  searchAddress(adresseTekst).then((res) => {
    var data = res.data.adresser[0];
    if (data) {
      addWaypoint(
        data.representasjonspunkt.lon,
        data.representasjonspunkt.lat,
        `Oppsøkt hus: ${data.adressetekst}, ${data.postnummer} - ${data.poststed}`,
        projectTo,
        vectorLayer
      );

      var lonLat = new OpenLayers.LonLat(
        data.representasjonspunkt.lon,
        data.representasjonspunkt.lat
      ).transform(epsg4326, projectTo);
      map.setCenter(lonLat, 16);

      const menu = document.getElementById("myDropdown");
      menu.innerHTML = "";

      getNearbyAddresses(
        data.representasjonspunkt.lon,
        data.representasjonspunkt.lat
      ).then((result) => {
        result.data.adresser.slice(1).forEach(function (item, index) {
          if (index < 5) {
            addWaypoint(
              item.representasjonspunkt.lon,
              item.representasjonspunkt.lat,
              `${item.adressetekst}, ${item.postnummer} - ${
                item.poststed
              }. Dato: ${getRandomDate()}. Pris: ${getRandomPrice()}`,
              projectTo,
              vectorLayer
            );
          }
        });
      });
    }
  });
};

var map = new OpenLayers.Map("mapdiv");
map.addLayer(new OpenLayers.Layer.OSM());

var epsg4326 = new OpenLayers.Projection("EPSG:4326"); //WGS 1984 projection
var projectTo = map.getProjectionObject(); //The map projection (Spherical Mercator)

var lonLat = new OpenLayers.LonLat(10.757933, 59.911491).transform(
  epsg4326,
  projectTo
);

var zoom = 11;
map.setCenter(lonLat, zoom);

map.addLayer(vectorLayer);

var controls = {
  selector: new OpenLayers.Control.SelectFeature(vectorLayer, {
    onSelect: createPopup,
    onUnselect: destroyPopup,
  }),
};

function createPopup(feature) {
  feature.popup = new OpenLayers.Popup.FramedCloud(
    "pop",
    feature.geometry.getBounds().getCenterLonLat(),
    null,
    '<div class="markerContent">' + feature.attributes.description + "</div>",
    null,
    true,
    function () {
      controls["selector"].unselectAll();
    }
  );
  map.addPopup(feature.popup);
}

function destroyPopup(feature) {
  feature.popup.destroy();
  feature.popup = null;
}

map.addControl(controls["selector"]);
controls["selector"].activate();
