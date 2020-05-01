import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Map } from "../components/map"
//Latitude: 49.457758 °, Longitude: 11.0701349 °
const IndexPage = () => {
  /* const [coordinates, setCoordinates] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setCoordinates({
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      },
      error => {
        console.log(error.message);
      }
    )
  }, []) */

  return (
    <Layout>
      <Map center={[11.576124 , 48.137154]} zoom={13} />
    </Layout>
  )
}

export default IndexPage
