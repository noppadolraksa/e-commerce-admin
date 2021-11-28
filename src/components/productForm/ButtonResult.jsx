import React from "react";
import { Button } from "@material-ui/core";

const ButtonResult = ({ data, reset, setValue }) => {
  return (
    <Button variant="contained" type="submit" sx={{ width: 100 }}>
      SUBMIT
    </Button>
  );
};

export default ButtonResult;
