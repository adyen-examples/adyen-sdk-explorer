import { Box } from '@mui/material';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { OnDeckPropType } from '../../app/types';
import { ListOptions } from './configSteps';
import { CheckoutContent } from './configSteps/Content/CheckoutContent';
import { ComponentContent } from './configSteps/Content/ComponentContent';
import { SessionsContent } from './configSteps/Content/SessionsContent';

export interface ConfigPropTypes {
  name: string;
  configuration: OnDeckPropType;
  action: ActionCreatorWithPayload<any>;
}

export const Config = ({ name, configuration, action }: ConfigPropTypes) => {
  let pageContent = null;

  switch (name) {
    case 'sessions':
      pageContent = <SessionsContent />;
      break;
    case 'checkout':
      pageContent = <CheckoutContent />;
      break;
    case 'local':
      pageContent = <ComponentContent />;
      break;
    default:
      console.error('No content for this page');
  }

  return (
    <Box>
      {pageContent}
      <ListOptions category={'Parameters'} name={name} configuration={configuration} action={action} />
    </Box>
  );
};
