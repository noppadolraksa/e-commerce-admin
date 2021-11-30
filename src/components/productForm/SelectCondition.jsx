import React from "react";

import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import { Controller } from "react-hook-form";

const SelectCondition = ({ control, condition, setCondition }) => {
  return (
    <Controller
      render={({ field }) => (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Condition*</InputLabel>
          <Select
            {...field}
            size="small"
            labelId="demo-simple-select-label"
            style={{ marginBottom: 5, width: "300px" }}
            // sx={textStyle}
            value={condition}
            label="Condition*"
            onChange={(e) => setCondition(e.target.value)}
          >
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Used">Used</MenuItem>
          </Select>
        </FormControl>
      )}
      name="select"
      control={control}
      // rules={{ required: "condition required.." }}
    />
  );
};

export default SelectCondition;
