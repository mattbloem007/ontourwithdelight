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
                      console.log(menu)
                      return (
                        <li className="nav-home nav-current" role="menuitem">
                          <Link to={`/` + menu.slug}>{menu.name}</Link>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
                <div className="site-head-center">
                  <Link className="site-head-logo" to={`/`}>
                    {title}
                  </Link>
                </div>
                <div className="site-head-right">
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
                </div>
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
        }
      }
    }
  }
`

export default Layout
