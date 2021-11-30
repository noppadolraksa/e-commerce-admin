import React from "react";

import { FormControlLabel, Switch, Button } from "@mui/material";

const SwitchAndClearButton = ({
  setFilterTitleTwoHappen,
  filterTitleTwoHappen,
  handleClearFilter,
}) => {
  return (
    <div style={{ display: "flex" }}>
      <FormControlLabel
        sx={{
          display: "block",
        }}
        control={
          <Switch
            checked={filterTitleTwoHappen}
            onChange={() => setFilterTitleTwoHappen(!filterTitleTwoHappen)}
            name="option two?"
            color="primary"
          />
        }
        label="Option two?"
      />
      <Button variant="text" color="error" onClick={() => handleClearFilter()}>
        clear
      </Button>
    </div>
  );
};

export default SwitchAndClearButton;
