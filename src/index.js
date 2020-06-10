import { searchAddress } from "/api/api_service.js";
import { getNearbyAddresses } from "./api/api_service";
import { addWaypoint } from "./add_waypoint.js";
var vectorLayer = new OpenLayers.Layer.Vector("Overlay");
var epsg4326 = new OpenLayers.Projection("EPSG:4326"); //WGS 1984 projection
var adresseTekst;

var adresseInput = document.getElementById("adresseInput");
adresseInput.oninput = function (params) {
  console.log(params.srcElement.value);
  adresseTekst = params.srcElement.value;
};

var myLink = document.getElementById("sok");

myLink.onclick = function () {
  searchAddress(adresseTekst).then((res) => {
    var data = res.data.adresser[0];
    console.log(data);
    if (data) {
      addWaypoint(
        data.representasjonspunkt.lon,
        data.representasjonspunkt.lat,
        "Huset mitt",
        projectTo,
        vectorLayer
      );

      var lonLat = new OpenLayers.LonLat(
        data.representasjonspunkt.lon,
        data.representasjonspunkt.lat
      ).transform(epsg4326, projectTo);
      map.setCenter(lonLat, 16);

      getNearbyAddresses(
        data.representasjonspunkt.lon,
        data.representasjonspunkt.lat
      ).then((result) => {
        console.log(result);
        result.data.adresser.slice(1).forEach(function (item, index) {
          addWaypoint(
            item.representasjonspunkt.lon,
            item.representasjonspunkt.lat,
            item.adressetekst,
            projectTo,
            vectorLayer
          );
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

// Define markers as "features" of the vector layer:
var feature = new OpenLayers.Feature.Vector(
  new OpenLayers.Geometry.Point(10.757933, 59.911491).transform(
    epsg4326,
    projectTo
  ),
  { description: "Oslo By" },
  {
    externalGraphic: "img/house.png",
    graphicHeight: 25,
    graphicWidth: 21,
    graphicXOffset: -12,
    graphicYOffset: -25,
  }
);
vectorLayer.addFeatures(feature);

var feature = new OpenLayers.Feature.Vector(
  new OpenLayers.Geometry.Point(10.787933, 59.911491).transform(
    epsg4326,
    projectTo
  ),
  { description: "Osly by 2" },
  {
    externalGraphic: "img/house.png",
    graphicHeight: 25,
    graphicWidth: 21,
    graphicXOffset: -12,
    graphicYOffset: -25,
  }
);
vectorLayer.addFeatures(feature);

var feature = new OpenLayers.Feature.Vector(
  new OpenLayers.Geometry.Point(10.737933, 59.911491).transform(
    epsg4326,
    projectTo
  ),
  { description: "Osly by 3" },
  {
    externalGraphic: "img/house.png",
    graphicHeight: 25,
    graphicWidth: 21,
    graphicXOffset: -12,
    graphicYOffset: -25,
  }
);
vectorLayer.addFeatures(feature);

map.addLayer(vectorLayer);

//Add a selector control to the vectorLayer with popup functions
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
  //feature.popup.closeOnMove = true;
  map.addPopup(feature.popup);
}

function destroyPopup(feature) {
  feature.popup.destroy();
  feature.popup = null;
}

map.addControl(controls["selector"]);
controls["selector"].activate();
