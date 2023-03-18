import React from "react";
import {
  Typography,
  Container,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import useStyles from "../../components/style";
import { dataFeatures } from "./FeaturesData.js";

const Banner = () => {
  return (
    <Container style={{ height: "90vh" }}>
      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={6}>
          <Container>
            <Typography variant="h5">Health Matters</Typography>
            <Typography variant="h2">One Step Solution</Typography>
          </Container>
        </Grid>
        <Grid item xs={12} md={6}>
          <div
            style={{
              marginTop: "150px",
              background:
                "url('https://img.freepik.com/free-vector/online-doctor-consultation-illustration_88138-414.jpg?w=2000&t=st=1677364388~exp=1677364988~hmac=9044279e8416c2bec32e1932c3f3edc968a38746d7f753c625b22cec7c5d1536') top/cover no-repeat",
              // "url('https://www.shutterstock.com/image-illustration/3d-render-human-doctor-cartoon-600w-1984521056.jpg') no-repeat",
              height: "50vh",
              width: "100%",
            }}
          ></div>
          {/* <img
            src="https://www.shutterstock.com/image-illustration/3d-render-human-doctor-cartoon-600w-1984521056.jpg"
            alt="doc"
          ></img> */}
        </Grid>
      </Grid>
    </Container>
  );
};

const WelcomePage = () => {
  const classes = useStyles();
  return (
    <main>
      <div>
        <Banner />
        <Container style={{ marginBottom: "90px" }}>
          <Typography variant="h4" style={{ margin: "10px 0 50px 50px" }}>
            FEATURES WE PROVIDE
          </Typography>
          <Container className={classes.cardGrid} maxWidth="md" shadow>
            <Grid container spacing={1}>
              {dataFeatures.map((data) => (
                <Grid item md={3}>
                  <Card>
                    <CardMedia
                      className={classes.cardMedia}
                      image={data.imgSrc}
                      title="Image Title"
                    />
                  </Card>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h4">
                      {data.title}
                    </Typography>
                    <Typography>{data.desc}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="primary">
                      {data.btn}
                    </Button>
                  </CardActions>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Container>
      </div>
    </main>
  );
};

export default WelcomePage;
