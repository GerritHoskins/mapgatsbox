import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"
import mapboxgl from "mapbox-gl"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import "mapbox-gl/dist/mapbox-gl.css"
import { siteMetadata } from "../../../gatsby-config"

import "./map.css"
import "./planes.css"

export const Planes = ({ center, zoom }) => {
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
    let marker = new mapboxgl.Marker()
   /*  .setLngLat([11.576124 , 48.137154]) */
    /* .addTo(map); */
    let geoCoder =
      new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
         
          placeholder: "Looking for something?",
          marker: {
            color: 'orange'
            },
            mapboxgl: mapboxgl,
        });
    
    map_ref.current = map
    map_ref.current = map

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right")
    map.addControl(geoCoder);
   /*  document.getElementById('geocoder').appendChild(geoCoder.onAdd(map)); */
    
  

    /* const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat([11.576124 , 48.137154])
      .setHTML('<h1>Hello World!</h1>')
      .addTo(map);
 */
    map.on("load", () => {

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

Planes.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
}

Planes.defaultProps = {
  center: [11.576124 , 48.137154],
  zoom: 9,
}
