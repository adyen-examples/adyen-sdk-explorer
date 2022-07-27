// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const themeOptions: any = {
  palette: {
    type: 'light',
    primary: {
      main: '#0066ff'
    },
    secondary: {
      //   main: '#09ae4c',dark blue #00112C
      main: '#00112C'
    },
    background: {
      paper: '#fff',
      default: '#fff'
    }
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h6: {
      fontWeight: 700,
      fontSize: '0.8rem',
      fontFamily: 'sans-serif'
    },
    body2: {
      fontFamily: 'Poppins, sans-serif',
      fontSize: '0.9rem',
      fontWeight: 300,
      lineHeight: 1.8
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
    caption:{
      color: '#69778C'
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
