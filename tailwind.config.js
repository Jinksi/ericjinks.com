/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Only process React components and MDX files (selective approach)
    './src/components/react/**/*.{js,jsx,ts,tsx}',
    './src/content/**/*.mdx',
  ],
  darkMode: 'media', // Use prefers-color-scheme to match existing implementation
  theme: {
    extend: {
      // Map CSS custom properties to Tailwind theme
      colors: {
        // Semantic colors that change with theme
        'text': 'var(--color-text)',
        'background': 'var(--color-background)',
        'light-grey': 'var(--color-lightGrey)',
        'highlight': 'var(--color-highlight)',
        'highlight-semi': 'var(--color-highlight-semi-transparent)',
        'highlight-almost': 'var(--color-highlight-almost-transparent)',
        'highlight-b': 'var(--color-highlightB)',
        'highlight-c': 'var(--color-highlightC)',
        'code': 'var(--color-code)',
        
        // Static colors
        'green': 'var(--green)',
        'green-semi': 'var(--green-semi-transparent)',
        'green-almost': 'var(--green-almost-transparent)',
        'white': 'var(--white)',
        'off-white': 'var(--offWhite)',
        'red': 'var(--red)',
        'orange': 'var(--orange)',
        'cyan': 'var(--cyan)',
        'black': 'var(--black)',
        'black-transparent': 'var(--blackTransparent)',
        'light-grey-static': 'var(--lightGrey)',
        'light-black': 'var(--lightBlack)',
      },
      fontFamily: {
        'code': 'var(--font-code)',
        'system': 'var(--font-system)',
        'sans': 'var(--font-system)', // Make system font the default sans
      },
      // Match existing spacing patterns from global.scss
      spacing: {
        '0.5em': '0.5em',
        '1em': '1em',
        '2.5': '2.5rem',
        '7': '7rem',
        '10': '10rem',
        '15': '15rem',
      },
      // Match existing container max-widths
      maxWidth: {
        'container': '1111px',
        'text': '700px',
      },
      // Match existing box shadow patterns
      boxShadow: {
        'code': '0 2px 3px rgba(0, 0, 0, 0.3)',
        'blockquote': '0 2px 3px rgba(0, 0, 0, 0.1)',
      },
      // Typography scale to match existing headings
      fontSize: {
        'h2': '1.5em',
        'h3': '1.17em',
        'h4': '1em',
        'code': '0.9em',
        'caption': '0.8em',
      },
      // Container utilities
      width: {
        '90vw': '90vw',
      },
    },
  },
  plugins: [
    // Add custom utilities for React components
    function({ addUtilities }) {
      const newUtilities = {
        // Button styles matching global.scss patterns
        '.btn-base': {
          appearance: 'none',
          backgroundColor: 'var(--color-text)',
          color: 'var(--color-background)',
          padding: '0rem 1rem',
          textTransform: 'uppercase',
          textDecoration: 'none',
          '&:hover, &:focus': {
            color: 'var(--color-background)',
            opacity: '0.9',
          }
        },
        '.btn-outlined': {
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-text)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem 2rem',
          margin: '1rem auto',
          border: '1px solid currentColor',
          cursor: 'pointer',
          textAlign: 'center',
          textDecoration: 'none',
          transition: 'all 0.15s ease',
          '&:hover, &:focus': {
            backgroundColor: 'var(--color-text)',
            color: 'var(--color-background)',
          }
        },
        // Container utilities matching global.scss
        '.container-site': {
          margin: '0 auto',
          maxWidth: '1111px',
          width: '90vw',
        },
        '.container-text': {
          maxWidth: '700px',
          width: '100%',
          '&.auto': {
            marginLeft: 'auto',
            marginRight: 'auto',
          }
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

