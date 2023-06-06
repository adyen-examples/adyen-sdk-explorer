import { Box, Typography } from '@mui/material';
import { EditorPrePostFix } from '../../EditorPrePostFix';
import { useState, useEffect } from 'react';
import { APIDrawer } from './APIDrawer';

declare global {
  interface Window {
    data: any;
  }
}

export const APITab = (props: any) => {
  const { sessions, sessionsResponse } = props;
  const [apiLogs, setApiLogs] = useState<any[]>([]);

  useEffect(() => {
    let apiStack = window?.data?.apiStack ? window?.data?.apiStack : null;
    let updateAPIStack = () => {
      const currentAPIStack = window?.data?.apiStack ? window?.data?.apiStack : [];
      console.log('calling setApiLogs');
      setApiLogs([...currentAPIStack]);
    };

    if (apiStack) {
      setApiLogs(apiStack);
    }
    window.addEventListener('api', updateAPIStack, false);

    return () => {
      window.removeEventListener('api', updateAPIStack, false);
    };
  }, []);

  return (
    <Box>
      {apiLogs.length > 0 &&
        apiLogs.map((apiLog, i) => (
          <Box key={i}>
            <APIDrawer {...apiLog} />
          </Box>
        ))}
    </Box>
  );
};
