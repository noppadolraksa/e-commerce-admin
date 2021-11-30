import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";

const InputTitle = ({ control, defaultValue, errors }) => {
  return (
    <section>
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            style={{ marginBottom: 5, width: "600px" }}
            size="small"
            variant="outlined"
            label="Title"
            defaultValue={defaultValue}
          />
        )}
        name="title"
        control={control}
        rules={{
          required: "title required..",
          minLength: {
            value: 10,
            message: "description must be at least 10 characters",
          },
          maxLength: {
            value: 100,
            message: "description has 100 characters limit",
          },
          pattern: {
            value: /^[A-Za-z0-9\s]+$/,
            message: "title only contain letters numbers and backspace",
          },
        }}
      />
    </section>
  );
};

export default InputTitle;
