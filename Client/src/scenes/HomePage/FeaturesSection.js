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
import useStyles from "../../components/style";
import { dataFeatures } from "./FeaturesData.js";

export const FeaturesSection = () => {
  const classes = useStyles();
  return (
    <>
      <Container style={{ marginBottom: "90px" }}>
        <Typography
          variant="h4"
          fontWeight={600}
          style={{ margin: "10px 0 50px 50px" }}
        >
          FEATURES WE PROVIDE
        </Typography>
        <Container className={classes.cardGrid} maxWidth="md" shadow>
          <Grid container justifyContent="space-between" spacing={5}>
            {dataFeatures.map((data) => (
              <Grid item md={6}>
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
                <CardActions style={{ justifyContent: "center" }}>
                  <Link href={data.herf}>
                    <Button variant="contained" color="primary">
                      {data.btn}
                    </Button>
                  </Link>
                </CardActions>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
    </>
  );
};
