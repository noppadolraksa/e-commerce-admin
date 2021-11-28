import React from "react";
import { Controller } from "react-hook-form";
import {
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormLabel,
  FormHelperText,
} from "@material-ui/core";
import { Box } from "@mui/system";
import { promotionData } from "../../dummyData";

const CheckboxPromotion = ({
  control,
  defaultValue,
  promotion,
  setPromotion,
}) => {
  const handleValue = (e) => {
    if (e.target.checked === true) {
      setPromotion([...promotion, e.target.name]);
    } else {
      const res = promotion.filter((item) => item !== e.target.name);
      setPromotion(res);
    }
  };

  const isChecked = (e) => {
    if (defaultValue?.promotion?.find((item) => item === e.name)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Promotion</FormLabel>
          <Controller
            control={control}
            render={({ field }) => (
              <FormGroup>
                {promotionData.map((name, i) => (
                  <FormControlLabel
                    key={i}
                    control={
                      <Checkbox
                        {...field}
                        size="small"
                        name={name}
                        onChange={handleValue}
                        defaultChecked={isChecked({ name: { name } })}
                      />
                    }
                    label={name}
                  />
                ))}
              </FormGroup>
            )}
          />
          <FormHelperText>these can be selected more than one</FormHelperText>
        </FormControl>
      </Box>
    </div>
  );
};

export default CheckboxPromotion;
