import { FC } from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const Loader: FC = (): JSX.Element => {
  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}
      direction="row"
    >
      <CircularProgress color="inherit" />
    </Stack>
  );
};

export default Loader;