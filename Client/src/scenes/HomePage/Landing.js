import React from "react";
import {
  Typography,
  Container,
  Grid,
} from "@material-ui/core";

const FrontPage = () => {
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
            <Typography variant="h2" fontWeight={600}>One Step Solution</Typography>
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default FrontPage;