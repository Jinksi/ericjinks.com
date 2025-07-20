import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useMouse from 'react-use/lib/useMouse'
import useWindowScroll from 'react-use/lib/useWindowScroll'
import useWindowSize from 'react-use/lib/useWindowSize'

type Props = {
  children: React.ReactNode
  animate?: boolean
  smallScreenContent?: string
  damping?: number
  stiffness?: number
  inverted?: boolean
}

const AnimatedTitle: React.FC<Props> = ({
  children,
  smallScreenContent = '',
  damping = 5,
  stiffness = 200,
  inverted = false,
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
    <h1 className={`relative text-5xl font-extralight uppercase tracking-wider px-4 leading-none mt-0 ${inverted ? 'text-background' : 'text-text'}`} ref={ref} {...props}>
      <motion.div
        className="absolute inset-0 bg-highlight-b"
        animate={animate}
        transition={{ ...spring, stiffness: stiffness * 0.75, damping: 2 }}
      />
      <motion.div
        className="absolute inset-0 bg-highlight"
        animate={animate}
        transition={{ ...spring, stiffness: stiffness * 0.5, damping: 2 }}
      />
      <motion.div
        className={`absolute inset-0 ${inverted ? 'bg-text' : 'bg-background'}`}
        animate={animate}
        transition={{ ...spring, stiffness: stiffness }}
      />
      <span className="relative">{width > 500 ? children : smallScreenContent || children}</span>
    </h1>
  )
}

export default ({ animate = true, children, ...props }: Props) => {
  if (typeof window === 'undefined' || !animate) {
    return (
      // Match the HTML structure of the client component
      <h1 className="relative text-5xl text-text font-extralight uppercase tracking-wider px-4 leading-none mt-0">
        <div className="absolute inset-0 bg-highlight-b"></div>
        <div className="absolute inset-0 bg-highlight"></div>
        <div className="absolute inset-0 bg-background"></div>
        <span className="relative">{children}</span>
      </h1>
    )
  } else {
    return <AnimatedTitle {...props}>{children}</AnimatedTitle>
  }
}
