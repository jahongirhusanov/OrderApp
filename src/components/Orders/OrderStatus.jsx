import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import MaterialTable from "material-table";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "auto",
    marginTop: "0.6rem",
  },
  stepsRoot: {
    marginLeft: "3rem",
  },
  instructions: {
    fontSize: "0.8rem",
  },
  productListClass: {
    textAlign: "center",
    margin: "auto",
  },
}));

function getSteps() {
  return [
    "Қабул Қилинди ...",
    "Бажарилмоқда ...",
    "Жўнатилди ...",
    "Етказиб Берилди ...",
  ];
}

function OrderStatus() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(1);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      {/* TODO: Product List Part */}
      <Grid container direction="column" className={classes.productListClass}>
        <MaterialTable
          style={{
            backgroundColor: "#a8b2ea",
            color: "white",
            fontWeight: "900",
          }}
          columns={[
            {
              title: "product Name",
              field: "productName",
            },
            { title: "product Qty", field: "productQuantity" },
            { title: "Price", field: "price" },
            { title: "comment", field: "comment" },
          ]}
          data={[
            {
              productName: "Olma",
              productQuantity: "30kg",
              price: "$ 300",
              comment: "Vaqtida Yetkazilsin",
            },
            {
              productName: "Bugdoy Uni",
              productQuantity: "1 qop",
              price: "$ 300",
              comment: "Yetkazish Payti Tel Qilinsin",
            },
          ]}
          options={{
            toolbar: false,
            paging: false,
            header: false,
            padding: "dense",
          }}
        />
      </Grid>

      {/* TODO: Status Part */}
      <div>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className={classes.stepsRoot}>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                Bu Buyurtma To'liq Amalga Oshirildi .... Hohoooo
              </Typography>
              <Button
                onClick={handleReset}
                className={classes.button}
                size="small"
              >
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <div>
                <Button
                  size="small"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Tugatish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderStatus;
