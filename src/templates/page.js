import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import pic2 from "../assets/images/pic02.jpg"

class PageTemplate extends React.Component {
  render() {
    const page = this.props.data.wpgraphql.page
    const siteTitle = this.props.data.site.siteMetadata.title

    let isImage = true
    if (page.featuredImage == null) {
      isImage = false
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={page.title} description={page.excerpt} />
        <article className={`page-content ${`no-image`}`}>
          <header className="page-content-header">
            <h1 className="page-content-title">{page.title}</h1>
          </header>

          {/**{page.excerpt && (
            <div
            className="page-content-excerpt"
            dangerouslySetInnerHTML={{ __html: page.excerpt }}
          />
        )}*/}

          {isImage ? (
            <div className="page-content-image">
              <Img fluid={pic2} />
            </div>
          ) : null}

          <div
            className="page-content-body"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />

          <footer className="page-content-footer">
            {/* There are two options for how we display the byline/author-info.
        If the page has more than one author, we load a specific template
        from includes/byline-multiple.hbs, otherwise, we just use the
        default byline. */}
          </footer>
        </article>
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query GET_PAGES($id: ID!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    wpgraphql {
      page(id: $id) {
        id
        title
        date
        uri
        content
        featuredImage {
          sourceUrl
          title
        }
      }
    }
  }
`
