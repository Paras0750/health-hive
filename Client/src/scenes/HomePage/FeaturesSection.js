import {
  Typography,
  Container,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Link,
} from "@material-ui/core";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import useStyles from "../../components/style";
import { dataFeatures } from "./FeaturesData.js";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)({
  background: "#7C5EB9",
  borderRadius: 30,
  border: 0,
  color: "white",
  height: 48,
  padding: "0 30px",
  boxShadow: "0 3px 5px 2px rgba(124, 94, 185, .3)",
  margin: "20px",
  "&:hover": {
    background: "#5D3A9B",
    boxShadow: "0 3px 5px 2px rgba(93, 58, 155, .3)",
  },
});

const FeaturesCard = ({ imgSrc, title, desc, btn, href }) => {
  const classes = useStyles();
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <Grid item md={6} ref={ref}>
      <motion.div variants={variants} animate={inView ? "visible" : "hidden"}>
        <Card>
          <CardMedia
            className={classes.cardMedia}
            image={imgSrc}
            title="Image Title"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h4">
              {title}
            </Typography>
            <Typography>{desc}</Typography>
          </CardContent>
          <CardActions style={{ justifyContent: "center" }}>
            <Link href={href}>
              <StyledButton variant="contained" color="primary">
                {btn}
              </StyledButton>
            </Link>
          </CardActions>
        </Card>
      </motion.div>
    </Grid>
  );
};

const FeaturesSection = () => {
  const classes = useStyles();

  return (
    <Container style={{ marginBottom: "90px" }}>
      <Typography
        variant="h4"
        fontWeight={600}
        style={{ margin: "10px 0 50px 50px" }}
      >
        FEATURES WE PROVIDE
      </Typography>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container justifyContent="space-between" spacing={5}>
          {dataFeatures.map((data, index) => (
            <FeaturesCard
              key={index}
              imgSrc={data.imgSrc}
              title={data.title}
              desc={data.desc}
              btn={data.btn}
              href={data.href}
            />
          ))}
        </Grid>
      </Container>
    </Container>
  );
};

export default FeaturesSection;
