import styled from "@emotion/styled";
import {
  Button,
  TextField,
  TextareaAutosize,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { DataGrid } from "@mui/x-data-grid";
import React, { useRef, useState } from "react";
import axios from "axios";
import { Box } from "@mui/system";

const textStyle = {
  maxWidth: "300px",
  marginBottom: "5px",
};

const Container = styled.div`
  flex: 4;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
`;
const TextTitle = styled.h2``;
const ErrorText = styled.p``;
const Text = styled.p``;

const InputImg = styled.input``;

const NewProduct = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const [categories, setCategories] = useState("");
  const [promotion, setPromotion] = useState([]);

  const handlePromotion = (event) => {
    if (event.target.checked === true) {
      setPromotion([...promotion, event.target.name]);
    } else {
      const res = promotion.filter((item) => item !== event.target.name);
      setPromotion(res);
    }
  };

  const handleCategories = (event) => {
    setCategories(event.target.value);
  };
  const onSubmit = async (data, obj, obj2) => {
    console.log(data, obj, obj2);
    // try {
    //   const res = await axios.post("http://localhost:8080/auth/register", {
    //     username: data.username,
    //     password: data.password,
    //     email: data.email,
    //     firstname: data.firstname,
    //     lastname: data.lastname,
    //   });
    //   window.location = "/register/success";
    // } catch (err) {
    //   if (err.response.status === 400) {
    //     alert(err.response.data);
    //   } else {
    //     console.error(err);
    //     alert("something went wrong..");
    //   }
    // }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "filterTitleOne",
      headerName: "filter1",
      width: 130,
    },
    { field: "filterTitleTwo", headerName: "filter2", width: 130 },
    { field: "sku", headerName: "filter2", width: 130 },
  ];
  const rows = [{ id: 1, filterTitleOne: "", filterTitleTwo: "", sku: "" }];

  return (
    <Container>
      <TextTitle>New Product</TextTitle>
      <Form
        onSubmit={handleSubmit((data) => onSubmit(data, categories, promotion))}
      >
        <TextField
          sx={textStyle}
          label="product name*"
          {...register("title", {
            required: "you must specify a product name",

            maxLength: {
              value: 50,
              message: "product name has 50 characters limit",
            },
            pattern: {
              value: /[A-Za-z0-9]+/i,
              message: "product name only contain letters and numbers",
            },
          })}
        />
        {errors.title && <ErrorText>{errors.title.message}</ErrorText>}

        <fieldset style={{ width: 200, color: "blue", marginBottom: "5px" }}>
          <legend>
            <Text>description</Text>
          </legend>
          <TextareaAutosize
            style={{ width: 500, border: "none" }}
            {...register("desc", {
              required: "you must specify a desc",
              minLength: {
                value: 10,
                message: "desc is too short",
              },
              maxLength: {
                value: 500,
                message: "desc has 500 characters limit",
              },
            })}
            placeholder="it can contain up to 500 characters.."
            aria-label="minimum height"
            minRows={10}
          />
          {errors.desc && <ErrorText>{errors.desc.message}</ErrorText>}
        </fieldset>

        <InputImg
          style={{ marginBottom: 5 }}
          type="file"
          name="img"
          accept="image/*"
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Categories*</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            sx={textStyle}
            value={categories}
            onChange={handleCategories}
            {...register("categories", {
              required: "you must specify categories",
            })}
          >
            <MenuItem value="Shirt">Shirt</MenuItem>
            <MenuItem value="Plain">Plain</MenuItem>
            <MenuItem value="Women">Women</MenuItem>
          </Select>
        </FormControl>
        {errors.categories && (
          <ErrorText>{errors.categories.message}</ErrorText>
        )}

        <Box sx={{ display: "flex" }}>
          <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
            <FormLabel component="legend">Promotion</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    onChange={handlePromotion}
                    name="ร้านค้าแนะนำ"
                  />
                }
                label="ร้านค้าแนะนำ"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    onChange={handlePromotion}
                    name="exclusive price"
                  />
                }
                label="exclusive price"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    onChange={handlePromotion}
                    name="only9.9$"
                  />
                }
                label="only9.9$"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    onChange={handlePromotion}
                    name="10%cashback"
                  />
                }
                label="10%cashback"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    onChange={handlePromotion}
                    name="9.9$free shipping"
                  />
                }
                label="9.9$free shipping"
              />
            </FormGroup>
            <FormHelperText>these can be selected more than one</FormHelperText>
          </FormControl>
        </Box>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
        <Button variant="contained" type="submit">
          SUBMIT
        </Button>
      </Form>
    </Container>
  );
};

export default NewProduct;
