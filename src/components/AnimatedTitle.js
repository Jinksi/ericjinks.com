import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useMouse, useWindowScroll } from 'react-use'

export const TitleStyled = styled.h1`
  position: relative;
  font-size: 3rem;
  color: ${props =>
    props.inverted ? `var(--color-background)` : `var(--color-text)`};
  font-weight: 200;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 0rem 1rem;
  line-height: 1;

  .Title--bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    mix-blend-mode: normal;
  }

  .Title--bg:nth-child(1) {
    background-color: var(--red);
  }
  .Title--bg:nth-child(2) {
    background-color: var(--green);
  }

  .Title--bg:nth-child(3) {
    background-color: ${props =>
      props.inverted ? `var(--color-text)` : `var(--color-background)`};
  }

  span {
    position: relative;
  }
`

const AnimatedTitle = ({ children, className = '', ...props }) => {
  const ref = React.useRef(null)
  const { docX, docY } = useMouse(ref)
  const { y: scrollYProgress } = useWindowScroll()
  const [translate, setTranslate] = useState({ x: 0, y: 0 })

  const handleMouseMove = () => {
    // handleMouseMove
    const x = -(docX / window.innerWidth - 0.5) * 10
    const y = -(docY / window.innerHeight - 0.5) * 10
    setTranslate({ x, y })
  }

  const handleScroll = () => {
    const y = -scrollYProgress / 50
    setTranslate(prev => ({ x: prev.x, y }))
  }

  useEffect(handleMouseMove, [docX, docY])
  useEffect(handleScroll, [scrollYProgress])

  const spring = {
    type: 'spring',
    damping: 5,
    stiffness: 200,
    duration: 1,
  }

  const animate = { scale: 1.05, x: translate.x, y: translate.y }

  return (
    <TitleStyled className={className} ref={ref} {...props}>
      <motion.div
        className={'Title--bg'}
        animate={animate}
        transition={{ ...spring, stiffness: 150, damping: 2 }}
      />
      <motion.div
        className={'Title--bg'}
        animate={animate}
        transition={{ ...spring, stiffness: 100, damping: 2 }}
      />
      <motion.div
        className={'Title--bg'}
        animate={animate}
        transition={{ ...spring, stiffness: 200 }}
      />
      <span>{children}</span>
    </TitleStyled>
  )
}

export default AnimatedTitle
