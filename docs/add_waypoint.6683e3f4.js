parcelRequire=function(e){var r="function"==typeof parcelRequire&&parcelRequire,n="function"==typeof require&&require,i={};function u(e,u){if(e in i)return i[e];var t="function"==typeof parcelRequire&&parcelRequire;if(!u&&t)return t(e,!0);if(r)return r(e,!0);if(n&&"string"==typeof e)return n(e);var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}return u.register=function(e,r){i[e]=r},i=e(u),u.modules=i,u}(function (require) {var b={},c=new OpenLayers.Projection("EPSG:4326"),d=function(e,r,a,o,t){var p=new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(e,r).transform(c,o),{description:a},{externalGraphic:"img/house.png",graphicHeight:25,graphicWidth:21,graphicXOffset:-12,graphicYOffset:-25});t.addFeatures(p)};b.addWaypoint=d;if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=b}else if(typeof define==="function"&&define.amd){define(function(){return b})}b.__esModule=true;return{"FokL":b};});