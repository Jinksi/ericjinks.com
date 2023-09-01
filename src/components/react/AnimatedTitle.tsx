import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useMouse from 'react-use/lib/useMouse'
import useWindowScroll from 'react-use/lib/useWindowScroll'
import useWindowSize from 'react-use/lib/useWindowSize'

import styles from './AnimatedTitle.module.css'

type Props = {
  children: React.ReactNode
  animate?: boolean
  smallScreenContent?: string
  damping?: number
  stiffness?: number
}

const AnimatedTitle: React.FC<Props> = ({
  children,
  smallScreenContent = '',
  damping = 5,
  stiffness = 200,
  ...props
}: Props) => {
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
    damping,
    stiffness,
    duration: 1,
  }

  const animate = { scale: 1.05, x: translate.x, y: translate.y }

  return (
    <h1 className={styles.Title} ref={ref} {...props}>
      <motion.div
        className={styles.TitleBackground}
        animate={animate}
        transition={{ ...spring, stiffness: stiffness * 0.75, damping: 2 }}
      />
      <motion.div
        className={styles.TitleBackground}
        animate={animate}
        transition={{ ...spring, stiffness: stiffness * 0.5, damping: 2 }}
      />
      <motion.div
        className={styles.TitleBackground}
        animate={animate}
        transition={{ ...spring, stiffness: stiffness }}
      />
      <span>{width > 500 ? children : smallScreenContent || children}</span>
    </h1>
  )
}

export default ({ animate = true, children, ...props }: Props) => {
  if (typeof window === 'undefined' || !animate) {
    return (
      // Match the HTML structure of the client component
      <h1 className={styles.Title}>
        <div className={styles.TitleBackground}></div>
        <div className={styles.TitleBackground}></div>
        <div className={styles.TitleBackground}></div>
        <span>{children}</span>
      </h1>
    )
  } else {
    return <AnimatedTitle {...props}>{children}</AnimatedTitle>
  }
}
