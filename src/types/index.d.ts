type SketchRenderProps = {
  context: CanvasRenderingContext2D
  width: number
  height: number
  time: number
  settings: object
  playhead: number
}
declare global {
  type Sketch = {
    render: () => (props: SketchRenderProps) => void
    settings?: {
      animate?: boolean
      fps?: number
      dimensions?: number[]
      scaleToFit?: boolean
      scaleToView?: boolean
      resizeCanvas?: boolean
      duration?: number
    }
  }
}

declare global {
  type Post = {
    url: string
    frontmatter: {
      title: string
      description?: string
      author?: string
      pubDate?: string
      updatedDate?: string
      tags?: string
      heroImage?: string
      previewImage?: string
      cardImage?: string
      showDate?: boolean
    }
  }
}

declare global {
  interface Window {
    sketch: Sketch | undefined
  }
}

export {}
