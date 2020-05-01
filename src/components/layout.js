/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div>
        <main>{children}</main>
        <footer>
          <p>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a
              href="https://www.gatsbyjs.org"
              style={{
                margin: "0 0 0 4px",
                color: "white",
                textDecoration: "none",
              }}
            >
              Gatsby
            </a>
            <span
              style={{
                margin: "0 4px",
                color: "white",
              }}
            >
              {" "}
              |{" "}
            </span>
            <a
              href="#"
              style={{ margin: 0, color: "white", textDecoration: "none" }}
            >
              View on Github
            </a>
          </p>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout