import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import pic2 from "../assets/images/pic02.jpg"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.wpgraphql.post
    const siteTitle = this.props.data.site.siteMetadata.title

    let isImage = true
    if (post.featuredImage == null) {
      isImage = false
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.title} description={post.excerpt} />
        <article className={`post-content ${`no-image`}`}>
          <header className="post-content-header">
            <h1 className="post-content-title">{post.title}</h1>
          </header>

          {/**{post.excerpt && (
            <div
            className="post-content-excerpt"
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
        )}*/}

          {isImage ? (
            <div className="post-content-image">
              <Img fluid={pic2} />
            </div>
          ) : null}

          <div
            className="post-content-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <footer className="post-content-footer">
            {/* There are two options for how we display the byline/author-info.
        If the post has more than one author, we load a specific template
        from includes/byline-multiple.hbs, otherwise, we just use the
        default byline. */}
          </footer>
        </article>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query GET_POSTS($id: ID!, $id2: StringQueryOperatorInput) {
    site {
      siteMetadata {
        title
        author
      }
    }
    wpgraphql {
      post(id: $id) {
        id
        postId
        title
        date
        uri
        excerpt
        content
        featuredImage {
          sourceUrl
          title
        }
      }
    }

    file(parent: { id: $id2 }) {
      name
      childImageSharp {
        fluid(maxWidth: 500) {
          srcSet
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
