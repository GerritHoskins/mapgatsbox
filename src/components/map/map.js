import React, { useRef, useEffect } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import mapboxgl from "mapbox-gl"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import "mapbox-gl/dist/mapbox-gl.css"
import { siteMetadata } from "../../../gatsby-config"
import WeatherApi from "./../weather/weatherApi"

import "./map.css"
import "./planes.css"

export const Map = ({ center, zoom }) => {
  const { mapbox_api_key } = siteMetadata

  const map_node = useRef(null)
  const map_ref = useRef(null)

  useEffect(() => {
    if (!mapbox_api_key) {
      console.error(
        "Mapbox `mapbox_api_key` is required in gatsby-config.js siteMetadata"
      )
    }

    if (!(typeof window !== "undefined" && window)) {
      console.error("No window")
      return null
    }


    // Token must be set before constructing map
    mapboxgl.accessToken = mapbox_api_key

    let map = new mapboxgl.Map({
      container: "map",
      style: `mapbox://styles/pixeltronics/ck9i4lig60p6p1inmlo2qe2pf`,
      center: center,
      zoom: zoom,
    });

    const lat = map.getCenter().lat;
    const lng = map.getCenter().lng;


    const MapBxGeoCoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: "Looking for something?",
      mapboxgl: mapboxgl,
    })

    map.addControl(MapBxGeoCoder);

    map_ref.current = map
    map_ref.current = map

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right")

    const popup = new mapboxgl.Popup({ closeOnClick: false }).setHTML(`${<WeatherApi />}`);
    /*       .addTo(map); */
    const marker = new mapboxgl.Marker().setLngLat([lat, lng]).setPopup(popup);

    // console.log(MapBxGeoCoder.inputString);
    map.on("load", () => {
      map.addSource('FeatureCollection', {
        type: 'geojson',
        data: `https://api.mapbox.com/geocoding/v5/mapbox.places/11.576,48.137.json?access_token=pk.eyJ1IjoiYXBleHNlYXJjaHVzZXIiLCJhIjoiY2pxc2V6bjVyMHVxcjQ4cXE4cmg1a242diJ9.TMZ9oWhH_fF4ccYkaMeyAw&cachebuster=1588167517655&autocomplete=true&types=locality%2Cplace`,
      });

      map.addLayer({
        'id': 'proximity',
        'type': 'circle',
        'source': 'FeatureCollection',
        'paint': {
          'circle-radius': 6,
          'circle-color': '#B42222'
        },
        'filter': ['==', '$type', 'Point']
      });

      map.on('click', function (e) {
        let el = document.getElementsByClassName('mapboxgl-marker-anchor-center')[0];
        el.addEventListener('click', function (e) {
          e.stopPropagation();
          console.log('hello');
        });       
        marker.addTo(map); 
      });

      let popup2 = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });
  
      map.on('mouseenter', 'FeatureCollection', function (e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
  
        let coordinates = e.features[0].geometry.coordinates.slice();
        let description = e.features[0].properties.wikidata;
  
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
  
        // Populate the popup and set its coordinates
        // based on the feature found.
        popup2
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
      });
  
      map.on('mouseleave', 'places', function () {
        map.getCanvas().style.cursor = '';
        popup2.remove();
      });
      console.log("map onload2", map)
    })

    return () => {
      map.remove()
    }
  }, [])

  return (
    <div
    /* style={{
      background: `#343332`,
      marginBottom: `1.45rem`,
    }} */
    >
      <div id="map" className="mapbox" ref={map_node}></div>
      <div id="geocoder" className="geocoder" loading="true"></div>
    </div>
  )
}

Map.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
}

Map.defaultProps = {
  center: [11.576124, 48.137154],
  zoom: 15,
}
