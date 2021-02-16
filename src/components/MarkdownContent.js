import React, { useEffect } from 'react'
import styled from 'styled-components'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-r'
import 'prism-theme-one-dark/prism-onedark.css'

const MarkdownContent = ({ body }) => {
  useEffect(() => {
    // syntax highlighting on mount
    Prism.highlightAll()
  }, [body])

  return (
    <MDXRenderer
      renderers={{
        Image,
      }}
    >
      {body}
    </MDXRenderer>
  )
}

const Image = styled.img`
  max-width: 100%;
  height: auto;
`

export default MarkdownContent
