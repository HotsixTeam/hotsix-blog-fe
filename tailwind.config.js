module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      border: {
        darkblue: '#001354',
        skyblue: '#D4E8FF',
      },
      colors: {
        darkblue: '#001354',
        skyblue: '#D4E8FF',
        gray: '#BEBEBE',
      },
      width: {
        signupInput: '25rem',
        postWidth: '43rem',
        postHeight: '37rem',
        postInnerWidth: '32rem',
      },
      maxWidth: {
        pc: '1440px',
        mobile: '767px',
      },
      fontFamily: {
        sans: [
          'MangoRegular',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
        bold: ['MangoBold', 'Arial', 'sans-serif'],
        light: ['MangoLight', 'Arial', 'sans-serif'],
      },
      fontSize: {
        large: '2.875rem',
        regular: '1.5rem',
        small: '1.125rem',
      },
    },
  },
  plugins: [],
};
