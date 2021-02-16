const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogSingle = path.resolve('./src/templates/blog-single.js')
    const projectSingle = path.resolve('./src/templates/project-single.js')

    resolve(
      graphql(
        `
          {
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
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = [...result.data.allMdx.edges]

        _.each(posts, (post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          const path = post.node.fields.slug
          let component = blogSingle

          // skip projects
          if (path.startsWith('/project')) {
            return null
          }
          createPage({
            path,
            component,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (`allMdx JavascriptFrontmatter`.includes(node.internal.type)) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
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
