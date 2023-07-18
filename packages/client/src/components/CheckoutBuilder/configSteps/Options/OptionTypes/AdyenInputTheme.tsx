import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AdyenInputTheme = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 3,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid',
    fontSize: theme.typography.subtitle2.fontSize,
    fontWeight: theme.typography.subtitle2.fontWeight,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: theme.typography.subtitle2.fontFamily,
    color: theme.palette.primary.main,
    paddingLeft: '0.5rem'
  }
}));
