/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Only process React components and MDX files (selective approach)
    './src/components/react/**/*.{js,jsx,ts,tsx}',
    './src/content/**/*.mdx',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

