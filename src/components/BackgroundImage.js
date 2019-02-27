import React from 'react'
import GatsbyImage from 'gatsby-image'
import _isString from 'lodash/isString'

import { BackgroundImage } from '../components/common'

export default ({ image, ...props }) => {
  const isGatsbyImage = !_isString(image)
  return (
    <BackgroundImage image={isGatsbyImage ? null : image} {...props}>
      {isGatsbyImage && (
        <GatsbyImage
          {...image}
          style={{
            position: 'absolute',
            width: 'auto',
            height: 'auto',
          }}
          imgStyle={{
            objectFit: 'cover',
          }}
        />
      )}
    </BackgroundImage>
  )
}
