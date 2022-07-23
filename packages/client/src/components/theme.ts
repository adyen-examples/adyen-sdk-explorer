// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const themeOptions: any = {
  palette: {
    type: 'light',
    primary: {
      main: '#0066ff'
    },
    secondary: {
      //   main: '#09ae4c',
      main: '#00112C'
    },
    background: {
      paper: '#fff',
      default: '#fff'
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
