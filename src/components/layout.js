import React from "react"
import { Link } from "gatsby"
import { StaticQuery, graphql } from "gatsby"

const Layout = props => {
  const { title, children } = props
  const [toggleNav, setToggleNav] = React.useState(false)
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        return (
          <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`}>
            <header className="site-head">
              <div className="site-head-container">
                <a
                  className="nav-burger"
                  href={`#`}
                  onClick={() => setToggleNav(!toggleNav)}
                >
                  <div
                    className="hamburger hamburger--collapse"
                    aria-label="Menu"
                    role="button"
                    aria-controls="navigation"
                  >
                    <div className="hamburger-box">
                      <div className="hamburger-inner" />
                    </div>
                  </div>
                </a>
                <nav id="swup" class="site-head-left">
                  <ul className="nav" role="menu">
                    {data.wpgraphql.menus.nodes.map(menu => {
                      console.log("length", menu.menuItems.edges.length)
                      if (menu.menuItems.edges.length != 0) {
                        return (
                          <li className="nav-home nav-current" role="menuitem">
                            <Link to={`/` + menu.slug}>{menu.name}</Link>
                            <ul class="dropdown">
                              {menu.menuItems.edges.map(submenu => {
                                let url = submenu.node.url
                                let slug = url.slice(
                                  url.indexOf("21/") + 3,
                                  url.length
                                )
                                console.log("slug", slug)
                                return (
                                  <li>
                                    <Link to={`/` + slug}>
                                      {submenu.node.label}
                                    </Link>
                                  </li>
                                )
                              })}
                            </ul>
                          </li>
                        )
                      } else {
                        return (
                          <li className="nav-home nav-current" role="menuitem">
                            <Link to={`/` + menu.slug}>{menu.name}</Link>
                          </li>
                        )
                      }
                    })}
                  </ul>
                </nav>
                <div className="site-head-right">
                  <Link className="site-head-logo" to={`/`}>
                    {title}
                  </Link>
                </div>
                {/**<div className="site-head-right">
                <div className="social-links">
                  <a
                    href="https://www.facebook.com"
                    title="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                  <Link
                    to={`/rss.xml`}
                    title="RSS"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    RSS
                  </Link>
                </div>
              </div>*/}
              </div>
            </header>
            <main id="site-main" className="site-main">
              <div id="swup" className="transition-fade">
                {children}
              </div>
            </main>
            <footer className="site-foot">
              &copy; {new Date().getFullYear()} <Link to={`/`}>{title}</Link>;
            </footer>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query {
    wpgraphql {
      menus {
        nodes {
          name
          slug
          menuItems {
            edges {
              node {
                label
                url
              }
            }
          }
        }
      }
    }
  }
`

export default Layout
