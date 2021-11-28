import React from "react";
import { Controller } from "react-hook-form";

const TextArea = ({ control }) => {
  return (
    <fieldset style={{ width: 200, color: "blue" }}>
      <legend>
        <p>Description*</p>
      </legend>
      <Controller
        render={({ field }) => (
          <textarea
            {...field}
            style={{ width: 500, border: "none", minHeight: "100px" }}
            placeholder="it can contain up to 500 characters.."
          />
        )}
        defaultValue=""
        name="desc"
        control={control}
        rules={{
          required: "you must specify a description",
          minLength: {
            value: 10,
            message: "description must be at least 10 characters",
          },
          maxLength: {
            value: 500,
            message: "description has 500 characters limit",
          },
        }}
      />
    </fieldset>
  );
};

export default TextArea;
