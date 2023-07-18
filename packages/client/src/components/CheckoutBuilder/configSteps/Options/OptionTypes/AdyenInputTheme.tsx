import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AdyenInputTheme = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 3,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid',
    fontSize: '.90rem',
    fontWeight: '400',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: theme.typography.subtitle2.fontFamily,
    paddingLeft: '0.5rem',
    borderColor: theme.palette.primary.main,
    color: theme.palette.secondary.main
  }
}));
