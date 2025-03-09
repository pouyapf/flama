/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

  variants: {
    backdropBlur: ['responsive'],
  },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'greybtn': '#8f9595',
      'backgr': '#070b14',
      'greennav': '#43ad6b',
      'bluebtn': '#0283c5',
      'navtexts': '#a9b0b6',
      'white': '#ffffff',
      'blueidea': '#53beea',
      'orangeee': '#9d6a55',
      'orangeidea': '#d9925e',
      'greenidea': '#47bbae',
      'greenbtn': '#aaf986',
    },
    extend: {
      backdropBlur: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '20px',
      },
      backgroundImage: {
 'blue-radial-gradient': 'radial-gradient( rgba(0,123,255,1) -80%, rgba(0,123,255,0) 70%)',

  'brown-radial-gradient': 'radial-gradient(rgba(157,106,85,1) -80%, rgba(157,106,85,0) 70%)',
  'custom-gradient': 'linear-gradient(16deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 57%, rgba(0,30,111,1) 100%)',
  'green-radial-gradient': 'radial-gradient(rgba(54,123,120,1) -80%, rgba(54,123,120,0) 70%)',
  'orderformelemets':'linear-gradient(16deg, rgb(12, 18, 31) 40%, rgba(7,11,20,1) 62%, rgba(91, 183, 226, 0.3) 100%);',
  'navbarlinear':'linear-gradient(180deg, rgba(29,38,37,1) 16%, rgba(30,30,30,1) 65%);'

  
      },
    },
  },
  plugins: [],
}
