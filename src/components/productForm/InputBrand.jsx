import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";

const textStyle = {
  maxWidth: "300px",
  marginBottom: "5px",
};

const InputTitle = ({ control, defaultValue }) => {
  return (
    <section>
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            size="small"
            variant="outlined"
            label="Brand*"
            sx={textStyle}
          />
        )}
        name="brand"
        defaultValue={defaultValue}
        rules={{
          maxLength: {
            value: 50,
            message: "brand has 50 characters limit",
          },
          pattern: {
            value: /^[A-Za-z0-9\s]+$/,
            message: "brand only contain letters numbers and backspace",
          },
        }}
        control={control}
      />
    </section>
  );
};

export default InputTitle;
