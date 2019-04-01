const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ actions, graphql }) => {
  const { data, errors } = await graphql(`
    {
      blog: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//content/blog//" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        ...Edges
      }
    }
    fragment Edges on MarkdownRemarkConnection {
      edges {
        node {
          id
          fileAbsolutePath
          fields {
            slug
          }
        }
      }
    }
  `)

  if (errors) {
    throw errors
  }

  const { createPage } = actions
  const { blog } = data
  const component = path.resolve(`./src/templates/blog-post.js`)

  blog.edges.forEach(post => {
    const { frontmatter, fields } = post.node
    createPage({
      path: fields.slug,
      component,
      context: {
        slug: fields.slug,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    let slug = createFilePath({ node, getNode })

     if (node.fileAbsolutePath.includes("content/blog/")) {
      slug = `/blog${createFilePath({ node, getNode })}`
    }

    createNodeField({
      name: 'slug',
      node,
      value: slug
    })
  }
}
