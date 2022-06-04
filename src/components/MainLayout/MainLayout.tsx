import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import AppDrawer from './AppDrawer';
import Home from '../Home/Home';
import MyBottomNavigation from './BottomNavigation';
import FireAuthService from '../../services/FireAuthService';
import { useDispatch, useSelector } from 'react-redux';
import { signinAction, signoutAction } from '../../store/actions/UserActions';
import { RootState } from '../../store/reducers';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:8080">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const mdTheme = createTheme();

export default function MainLayout({ children }: { children?: JSX.Element }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user);

  FireAuthService.listenAuthStatusChanges((user): void => {
    if (user) {
      const uid = user.uid;
      console.log(`User is signed in ${uid} `);
    } else {
      console.log('User is signed out');
      currentUser && dispatch(signoutAction());
    }
  });

  FireAuthService.listenOnIdTokenChanged((user): void => {
    if (user) {
      const uid = user.uid;
      console.log(`User is signed in ${uid} `);
      currentUser && dispatch(signinAction(user));
    } else {
      currentUser && dispatch(signoutAction());
    }
  }, (error): void => {
    console.log('Token refresh failed');
    // TODO do something more pro here
    console.error(error);
    currentUser && dispatch(signoutAction());
  })

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppDrawer />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {children || <Home />}
            <Copyright sx={{ pt: 4 }} />
          </Container>

        </Box>

      </Box>
    </ThemeProvider>
  );
}
