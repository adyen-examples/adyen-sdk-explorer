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
    fontFamily: 'Poppins, sans-serif'
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
