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
  Switch,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Box } from "@mui/system";

const textStyle = {
  maxWidth: "300px",
  marginBottom: "5px",
};

const Container = styled.div`
  flex: 4;
  margin-bottom: 30px;
  margin-right: 20px;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
`;
const TextTitle = styled.h2``;

const Text = styled.p``;
const Textarea = styled.textarea``;
const Section = styled.section`
  margin-bottom: 10px;
`;

const FilterSection = styled.section`
  border: 1px solid lightblue;
  background-color: #f0f0f0;
  border-radius: 5px;
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  padding: 10px;
`;

const FilterSectionFlex = styled.section`
  display: flex;
  flex-direction: column;
`;

const InputImg = styled.input``;

const NewProduct = () => {
  // const [categories, setCategories] = useState("");
  const [promotion, setPromotion] = useState([]);
  const [rows, setRows] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategrories] = useState("");
  const [img, setImg] = useState("");
  const [ceilPrice, setCeilPrice] = useState("");
  const [floorPrice, setFloorPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [filterTitleOne, setFilterTitleOne] = useState("");
  const [filterTitleTwo, setFilterTitleTwo] = useState("");
  const [filterTitleTwoHappen, setFilterTitleTwoHappen] = useState(false);

  const handlePromotion = (event) => {
    if (event.target.checked === true) {
      setPromotion([...promotion, event.target.name]);
    } else {
      const res = promotion.filter((item) => item !== event.target.name);
      setPromotion(res);
    }
  };

  // const handleCategories = (e) => {
  //   setCategories(e.target.value);
  // };
  const handleSubmit = () => {
    console.log("submit");
    // try {
    //   const res = await axios.post("http://localhost:8080/auth/register", {
    //     username: data.username,
    //     password: data.password,
    //     email: data.email,
    //     title: data.title,
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
      width: 150,
    },
    {
      field: "filterTitleTwo",
      headerName: "filter2",
      width: 150,
    },
    { field: "sku", headerName: "sku", width: 130, editable: true },
    { field: "price", headerName: "price($)", width: 100, editable: true },
    { field: "stock", headerName: "stock", width: 100, editable: true },
  ];
  // useEffect(() => {
  //   setRows([{ id: 1, filterTitleOne: "", filterTitleTwo: "", sku: "" }]);
  // }, []);

  return (
    <Container>
      <TextTitle>New Product</TextTitle>
      <Form>
        <Section>
          <TextField
            size="small"
            id="title"
            variant="outlined"
            label="Title"
            sx={textStyle}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </Section>

        <Section>
          <TextField
            size="small"
            id="brand"
            variant="outlined"
            label="Brand"
            sx={textStyle}
            onChange={(e) => setBrand(e.target.value)}
          />
        </Section>

        <Section>
          <fieldset style={{ width: 200, color: "blue" }}>
            <legend>
              <Text>description*</Text>
            </legend>
            <Textarea
              style={{ width: 500, border: "none", minHeight: "100px" }}
              placeholder="it can contain up to 500 characters.."
              onChange={(e) => setDesc(e.target.value)}
            />
          </fieldset>
        </Section>

        <Section>
          <InputImg
            type="file"
            name="img"
            accept="image/*"
            onChange={(e) => setImg(e.target.value)}
          />
        </Section>

        <Section>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Categories*</InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              sx={textStyle}
              value={categories}
              label="Categories*"
              onChange={(e) => setCategrories(e.target.value)}
            >
              <MenuItem value="Shirt">Shirt</MenuItem>
              <MenuItem value="Plain">Plain</MenuItem>
              <MenuItem value="Women">Women</MenuItem>
            </Select>
          </FormControl>
        </Section>

        <Section>
          <FormControl fullWidth>
            <InputLabel id="contition-simple-select-label">
              Condition*
            </InputLabel>
            <Select
              size="small"
              labelId="condition-simple-select-label"
              sx={textStyle}
              value={condition}
              label="Condition*"
              onChange={(e) => setCondition(e.target.value)}
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Used">Used</MenuItem>
            </Select>
          </FormControl>
        </Section>

        <Section>
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
              <FormHelperText>
                these can be selected more than one
              </FormHelperText>
            </FormControl>
          </Box>
        </Section>
        <hr />
        <br />
        <FormControlLabel
          sx={{
            display: "block",
          }}
          control={
            <Switch
              size="small"
              checked={filterTitleTwoHappen}
              onChange={() => setFilterTitleTwoHappen(!filterTitleTwoHappen)}
              name="Filter Product two ?"
              color="primary"
            />
          }
          label="Filter Product two ?"
        />
        <FilterSection>
          <FilterSectionFlex style={{ width: "45%" }}>
            <TextField
              style={{ marginRight: "10px" }}
              variant="outlined"
              label="Brand"
              size="small"
              sx={textStyle}
              onChange={(e) => setBrand(e.target.value)}
            />
            <Button
              variant="outlined"
              size="small"
              sx={textStyle}
              style={{ marginRight: "10px" }}
            >
              add filter one({`${1}/5`})
            </Button>
          </FilterSectionFlex>
          {filterTitleTwoHappen && (
            <FilterSectionFlex style={{ width: "45%" }}>
              <TextField
                size="small"
                variant="outlined"
                label="Brand"
                sx={textStyle}
                onChange={(e) => setBrand(e.target.value)}
              />
              <Button
                variant="outlined"
                size="small"
                sx={textStyle}
                style={{ marginRight: "10px" }}
              >
                add filter two({`${1}/5`})
              </Button>
            </FilterSectionFlex>
          )}
        </FilterSection>

        <Section style={{ height: 400 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Section>

        <Button
          variant="contained"
          type="submit"
          sx={{ width: 100 }}
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      </Form>
    </Container>
  );
};

export default NewProduct;
