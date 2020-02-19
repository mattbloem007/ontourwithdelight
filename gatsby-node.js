const Promise = require("bluebird")
const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve(`./src/templates/blog-post.js`)
    const page = path.resolve("./src/templates/page.js")
    const productPageTemplate = path.resolve("./src/templates/product-page.js")
    resolve(
      graphql(
        `
          query {
            wpgraphql {
              posts {
                edges {
                  node {
                    id
                    slug
                  }
                }
              }

              pages {
                edges {
                  node {
                    id
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        result.data.wpgraphql.posts.edges.forEach(edge => {
          createPage({
            path: `/${edge.node.slug}/`,
            component: blogPost,
            context: {
              id: edge.node.id,
              slug: edge.node.slug,
            },
          })
        })
        result.data.wpgraphql.pages.edges.forEach(edge => {
          console.log("EDEGE:", edge)
          createPage({
            path: edge.node.slug,
            component: page,
            context: {
              id: edge.node.id,
              slug: edge.node.slug,
            },
          })
        })
        // result.data.wpgraphql.products.edges.forEach(edge => {
        //   createPage({
        //     path: `/product/${edge.node.slug}/`,
        //     component: productPageTemplate,
        //     context: {
        //       id: edge.node.id,
        //       slug: edge.node.slug
        //     },
        //   })
        // })
      })
    )
  })
}
