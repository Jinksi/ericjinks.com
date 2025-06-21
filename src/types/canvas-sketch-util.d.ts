declare module 'canvas-sketch-util/random' {
  const random: any
  export default random
}

declare module 'canvas-sketch-util/math' {
  export function lerp(a: number, b: number, t: number): number
  // Add other exports as needed
}

// Add this declaration for canvas-sketch
declare module 'canvas-sketch' {
  const canvasSketch: any
  export default canvasSketch
}
