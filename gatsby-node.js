const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const blogSingleTemplate = path.resolve('./src/templates/blog-single.js')

  const result = await graphql(
    `
      query {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create blog posts pages.
  const posts = [...result.data.allMdx.edges]

  posts.forEach((post, index) => {
    const slug = post.node.fields.slug
    let component = blogSingleTemplate

    // skip projects
    if (slug.startsWith('/project')) {
      return
    }

    createPage({
      path: slug,
      component,
      context: {
        slug,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    let slug = createFilePath({ node, getNode })
    slug = '/blog' + slug
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })

    // https://github.com/kentcdodds/kentcdodds.com/blob/9149d6bde95e1694f8957cf978ba58faa2b27d9b/gatsby-node.js#L404-L411
    createNodeField({
      name: 'editLink',
      node,
      value: `https://github.com/Jinksi/ericjinks.com/edit/master${node.fileAbsolutePath.replace(
        __dirname,
        ''
      )}`,
    })
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /two.js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
