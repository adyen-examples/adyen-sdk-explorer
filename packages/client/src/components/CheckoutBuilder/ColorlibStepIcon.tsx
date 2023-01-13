import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BiotechIcon from '@mui/icons-material/Biotech';
import CodeIcon from '@mui/icons-material/Code';
import PublicIcon from '@mui/icons-material/Public';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import CloudIcon from '@mui/icons-material/Cloud';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { StepIconProps } from '@mui/material/StepIcon';
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
    color: '#0066ff'
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

  console.log('colorlibstepicon', props);

  return (
    props &&
    props.classes && (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.classes.text)]}
      </ColorlibStepIconRoot>
    )
  );
};
