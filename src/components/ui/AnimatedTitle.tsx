import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useMouse, useWindowScroll, useWindowSize } from 'react-use'

import styles from './AnimatedTitle.module.css'

const AnimatedTitle = ({
  children,
  className = '',
  smallScreenContent = '',
  ...props
}: {
  children: React.ReactNode
  className?: string
  smallScreenContent?: string
}) => {
  const ref = React.useRef(null)
  const { docX, docY } = useMouse(ref)
  const { y: scrollYProgress } = useWindowScroll()
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const { width } = useWindowSize()

  const handleMouseMove = () => {
    // handleMouseMove
    const x = -(docX / window.innerWidth - 0.5) * 10
    const y = -(docY / window.innerHeight - 0.5) * 10
    setTranslate({ x, y })
  }

  const handleScroll = () => {
    const y = -scrollYProgress / 200
    const x = -scrollYProgress / 600
    setTranslate((prev) => ({ x, y }))
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
    <h1 className={styles.Title} ref={ref} {...props}>
      <motion.div
        className={styles.TitleBackground}
        animate={animate}
        transition={{ ...spring, stiffness: 150, damping: 2 }}
      />
      <motion.div
        className={styles.TitleBackground}
        animate={animate}
        transition={{ ...spring, stiffness: 100, damping: 2 }}
      />
      <motion.div
        className={styles.TitleBackground}
        animate={animate}
        transition={{ ...spring, stiffness: 200 }}
      />
      <span>{width > 500 ? children : smallScreenContent || children}</span>
    </h1>
  )
}

export default AnimatedTitle
