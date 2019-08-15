import React, { Component } from 'react'
import styled from 'styled-components'
import Marked from 'react-markdown'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-r'
import 'prism-theme-one-dark/prism-onedark.css'

export default class MarkdownContent extends Component {
  // syntax highlighting on mount
  componentDidMount = () => Prism.highlightAll()

  render = () => (
    <Marked
      source={this.props.source || this.props.children}
      renderers={{
        Image,
      }}
    />
  )
}

const Image = styled.img`
  max-width: 100%;
  height: auto;
`
