export const themeOptions: any = {
  palette: {
    type: 'light',
    primary: {
      main: '#0066ff',
      gray: '#bdbdbd',
      border: '#d2dae1'
    },
    secondary: {
      //   main: '#09ae4c',dark blue #00112C
      main: '#00112C',
      gray: '#F2F6F9'
    },
    background: {
      paper: '#fff',
      default: '#fff'
    }
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    body2: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '0.9rem',
      fontWeight: 400,
      lineHeight: 1.8
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.4rem',
      fontFamily: 'Poppins, sans-serif'
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.2rem',
      fontFamily: 'Poppins, sans-serif'
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.1rem',
      fontFamily: 'Poppins, sans-serif'
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem',
      fontFamily: 'Poppins, sans-serif'
    },
    h6: {
      fontWeight: 500,
      fontSize: '0.83rem',
      fontFamily: 'sans-serif'
    },
    caption: {
      color: '#69778C',
      fontSize: '0.8rem'
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1.1rem',
      fontFamily: 'Roboto, sans-serif'
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: '.95rem',
      fontFamily: 'Roboto, sans-serif'
    }
  },
  props: {
    MuiAppBar: {
      color: 'default'
    },
    MuiList: {
      dense: true
    },
    MuiMenuItem: {
      dense: true
    },
    MuiTable: {
      size: 'small'
    }
  },
  spacing: 8,
  shape: {
    borderRadius: 4
  }
};
