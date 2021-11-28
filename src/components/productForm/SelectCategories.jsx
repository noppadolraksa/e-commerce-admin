import React from "react";

import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { useState } from "react";

const SelectCategories = ({ control }) => {
  const [categories, setCategories] = useState("");
  return (
    <Controller
      render={({ field }) => (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Categories*</InputLabel>
          <Select
            {...field}
            size="small"
            labelId="demo-simple-select-label"
            sx={{ mb: 1, width: "300px" }}
            // sx={textStyle}
            value={categories}
            label="Categories*"
            onChange={(e) => setCategories(e.target.value)}
          >
            <MenuItem value="shirt">Shirt</MenuItem>
            <MenuItem value="plain">Plain</MenuItem>
            <MenuItem value="women">Women</MenuItem>
            <MenuItem value="snack">Snack</MenuItem>
            <MenuItem value="electronics">Electronics</MenuItem>
            <MenuItem value="shoes">Shoes</MenuItem>
          </Select>
        </FormControl>
      )}
      name="select"
      control={control}
      // rules={{ required: "category required.." }}
    />
  );
};

export default SelectCategories;
