require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `eve.io mapbox`,
    description: `super simple mapbox example / starter for GatsbyJS.`,
    author: `pixeltronics`,
    mapbox_api_key: process.env.GATSBY_MAPBOX_API_KEY,
    geoData:  `${__dirname}/src/utils/DE.json`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#da1b5d`,
        theme_color: `#222`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
