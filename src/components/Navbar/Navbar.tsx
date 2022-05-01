import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { RouterPathEnum } from '../../enums/RouterPathEnum';
import AuthStatus from '../Auth/AuthStatus';
import DrawerComponent from './Drawer';
import { makeStyles, createStyles } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme: any) => createStyles({
  logo: {
    flexGrow: 1,
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
})) as any;

const theme = createTheme({});

const Navbar = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Firebase React Managing Gateways
          </Typography>
          {isMobile ? (
            <DrawerComponent />
          ) : (
            <div className={classes.navlinks}>
              <Link to={RouterPathEnum.HOME} className={classes.link}>
                HOME
              </Link>
              <Link to={RouterPathEnum.GATEWAY} className={classes.link}>
                GATEWAY
              </Link>
              <Link to={RouterPathEnum.DEVICE} className={classes.link}>
                DEVICE
              </Link>
              <Link to={RouterPathEnum.LOGIN} className={classes.link}>
                <AuthStatus />
              </Link>
              <Button color="inherit">Login</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
