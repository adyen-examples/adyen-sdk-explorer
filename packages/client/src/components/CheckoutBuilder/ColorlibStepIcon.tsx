import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BiotechIcon from '@mui/icons-material/Biotech';
import CodeIcon from '@mui/icons-material/Code';
import PublicIcon from '@mui/icons-material/Public';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
  
export const ColorlibStepIcon = (props: StepIconProps) => {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
      1: <AccountCircleIcon />,
      2: <PublicIcon />,
      3: <BiotechIcon />,
      4: <CodeIcon />,
      5: <ShoppingCartIcon />
    };

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  };