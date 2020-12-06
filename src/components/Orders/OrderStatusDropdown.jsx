import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "60%",
  },
});

const statuses = [
  "Қабул Қилинди",
  "Кечикмоқда",
  "Бажарилмоқда",
  "Жўнатилди",
  "Пулли Тўланди",
  "Бекор Қилинди",
];

function OrderStatus() {
  const classes = useStyles();
  const [orderStatus, setOrderStatus] = React.useState("Received");
  const handleChange = (event) => {
    setOrderStatus(event.target.value);
  };

  return (
    <FormControl
      className={classes.root}
      color="primary"
      variant="outlined"
      size="small"
    >
      <Select
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={orderStatus}
        onChange={handleChange}
      >
        {statuses.map((text, index) => (
          <MenuItem key={index} value={index}>
            {text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default OrderStatus;
