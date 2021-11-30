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
          />
        )}
        name="title"
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: "title required..",
          minLength: {
            value: 10,
            message: "title must be at least 10 characters",
          },
          maxLength: {
            value: 100,
            message: "title has 100 characters limit",
          },
          pattern: {
            value: /^[\w\W0-9\s]+$/,
            message: "title only contain letters numbers and backspace",
          },
        }}
      />
    </section>
  );
};

export default InputTitle;
