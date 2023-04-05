import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import CloudIcon from '@mui/icons-material/Cloud';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { styled } from '@mui/material/styles';

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  color: theme.palette.grey[700],
  zIndex: 1,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  padding: 0,
  margin: 0,
  alignItems: 'center',
  ...((ownerState.active || ownerState.completed) && {
    color: 'rgb(10, 191, 83)'
  })
}));

export const ColorlibStepIcon = (props: any) => {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    checkout: <ShoppingCartIcon />,
    local: <PaymentIcon />,
    sessions: <CloudIcon />,
    review: <ReceiptLongIcon />
  };

  return (
    props &&
    props.classes && (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.classes.text)]}
      </ColorlibStepIconRoot>
    )
  );
};
