import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  navbar: {
    marginBottom: "60px",
    backgroundColor: "#45D592",
  },
  head: {
    color: "#26D699",
  },
  cardGrid: {
    padding: "10px 0",
    width: "100%",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", //16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    marginTop: "40px",
    padding: "30px 30px",
    backgroundColor: "lightgray",
  },
  link: {
    display: "block",
    textDecoration: "none",
    color: "black",
  },
  footerSec: {
    padding: "10px",
    textAlign: "center",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
  },
  text: {
    color: theme.palette.common.white,
  },
  box: {
    height: "100%",
  },
  dialogWrapper: {
    padding: "3em",
    position: "absolute",
    top: "5em",
  },
}));

export default useStyles;
