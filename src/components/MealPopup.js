import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { ArrowLeftOutlined, ArrowRightAltOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import FirstSlide from "./slides/FirstSlide";
import SecondSlide from "./slides/SecondSlide";
import ThirdSlide from "./slides/ThirdSlide";
import useStyles from "./style";

const MealPopup = (props) => {
  const classes = useStyles();
  const { title, openPopup, setOpenPopup, diets } = props;
  const [page, setPage] = useState(1);

  const handleNext = () => {
    setPage(page + 1);
  };
  const handlePrev = () => {
    setPage(page - 1);
  };

  const renderPage = () => {
    switch (page) {
      case 1:
        return <FirstSlide />;

      case 2:
        return <SecondSlide />;

      case 3:
        return <ThirdSlide diets={diets} />;

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      style={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            style={{ marginLeft: 140 }}
            onClick={() => {
              setOpenPopup(false);
              setPage(1);
            }}
          >
            X
          </Button>
          <br />
          <hr border={1} />
        </div>
      </DialogTitle>
      <DialogContent>{renderPage()}</DialogContent>
      {/* <DialogContent>
        <CalorieCalcForm />
      </DialogContent> */}
      <DialogActions>
        {page !== 1 && (
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "50px 0px" }}
            onClick={() => {
              handlePrev();
            }}
          >
            Prev <ArrowLeftOutlined />
          </Button>
        )}
        {page !== 3 ? (
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "50px 0px" }}
            onClick={() => {
              handleNext();
            }}
          >
            Next <ArrowRightAltOutlined />
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "50px 0px" }}
            onClick={() => {
              setOpenPopup(false);
              setPage(1);
            }}
          >
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default MealPopup;
