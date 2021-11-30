import React, { useEffect, useState } from "react";
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
  const [boolean, setBoolean] = useState([]);

  const handleValue = (e) => {
    if (e.target.checked === true) {
      setPromotion([...promotion, e.target.name]);
    } else {
      const res = promotion.filter((item) => item !== e.target.name);
      setPromotion(res);
    }
  };

  useEffect(() => {
    setBoolean(promotion);
  }, [promotion, boolean]);
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Promotion</FormLabel>

          <FormGroup>
            {promotionData.map((name, i) => (
              <FormControlLabel
                key={name}
                control={
                  <Checkbox
                    size="small"
                    onChange={handleValue}
                    name={name}
                    checked={promotion.includes(name)}
                  />
                }
                label={name}
              />
            ))}
          </FormGroup>

          <FormHelperText>these can be selected more than one</FormHelperText>
        </FormControl>
      </Box>
    </div>
  );
};

export default CheckboxPromotion;
