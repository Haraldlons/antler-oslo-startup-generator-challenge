var epsg4326 = new OpenLayers.Projection("EPSG:4326"); //WGS 1984 projection

const addWaypoint = (lon, lat, description, projectTo, vectorLayer) => {
  var feature = new OpenLayers.Feature.Vector(
    new OpenLayers.Geometry.Point(lon, lat).transform(epsg4326, projectTo),
    { description: description },
    {
      externalGraphic: "img/house.png",
      graphicHeight: 25,
      graphicWidth: 21,
      graphicXOffset: -12,
      graphicYOffset: -25,
    }
  );
  vectorLayer.addFeatures(feature);
};

export { addWaypoint };
