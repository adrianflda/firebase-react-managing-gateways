import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
  createStyles,
  Theme,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { RouterPathEnum } from "../../enums/RouterPathEnum";
import AuthStatus from "../Auth/AuthStatus";
import DrawerComponent from "./Drawer";

const useStyles = makeStyles((theme: Theme) => createStyles({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    flexGrow: 1,
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          GATEWAY
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
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
