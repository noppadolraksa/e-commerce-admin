import styled from "@emotion/styled";
import {
  Button,
  TextField,
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
import { useForm, Controller, useFieldArray } from "react-hook-form";

import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
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

const Table = styled.table``;

const Td = styled.td``;

const Tr = styled.tr`
  margin-bottom: 10px;
`;

const TableInput = styled.input``;

const Textarea = styled.textarea``;

const Section = styled.section`
  margin-bottom: 10px;
`;
const FormControlContainer = styled.div`
  display: flex;
  align-items: center;
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

  const [inputFilterOne, setInputFilterOne] = useState([""]);
  const [inputFilterTwo, setInputFilterTwo] = useState([""]);

  const handlePromotion = (e) => {
    if (e.target.checked === true) {
      setPromotion([...promotion, e.target.name]);
    } else {
      const res = promotion.filter((item) => item !== e.target.name);
      setPromotion(res);
    }
  };
  console.log(inputFilterOne);
  const handleCellClick = (param, event) => {
    // console.log(param);
    // console.log(event);
    // if (param.colIndex === 2) {
    // event.stopPropagation();
    // }
  };

  const handleRowClick = (param, event) => {
    console.log(param);
    // console.log(event);
  };

  const handleGenerateTable = async () => {
    const row = [];

    inputFilterOne.map((one, i) =>
      inputFilterTwo.map((two, j) =>
        row.push({
          filterTitleOne: one,
          filterTitleTwo: two,
          price: null,
          stock: "",
          sku: "",
        })
      )
    );
    const res = await row.map((item, i) => (item.id = i + 1));
    setRows(row);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { value, name } = e.target;
    if (name === "filterOne") {
      const list = [...inputFilterOne];
      list[index] = value;
      setInputFilterOne(list);
    } else {
      const list = [...inputFilterTwo];
      list[index] = value;
      setInputFilterTwo(list);
    }
  };

  // handle click event of the Remove button
  const handleRemoveClick = (filterOneOrTwo, index) => {
    if (filterOneOrTwo === "removeFilterOne") {
      const list = [...inputFilterOne];
      list.splice(index, 1);
      setInputFilterOne(list);
    } else {
      const list = [...inputFilterTwo];
      list.splice(index, 1);
      setInputFilterTwo(list);
    }
  };

  // handle click event of the Add button
  const handleAddClick = (filterOneOrTwo) => {
    if (filterOneOrTwo === "addFilterOne") {
      setInputFilterOne([...inputFilterOne, ""]);
    } else {
      setInputFilterTwo([...inputFilterTwo, ""]);
    }
  };

  const handleClearFilter = () => {
    setInputFilterOne([inputFilterOne[0]]);
    setInputFilterTwo([inputFilterTwo[0]]);
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
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "filterTitleOne",
      headerName: filterTitleOne,
      width: 120,
    },
    {
      field: "filterTitleTwo",
      headerName: filterTitleTwo,
      width: 120,
    },
    { field: "price", headerName: "price($)", width: 100, editable: true },
    { field: "stock", headerName: "stock", width: 100, editable: true },
    { field: "sku", headerName: "sku", width: 130, editable: true },
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
        <FormControlContainer>
          <FormControlLabel
            sx={{
              display: "block",
            }}
            control={
              <Switch
                size="small"
                checked={filterTitleTwoHappen}
                onChange={() => setFilterTitleTwoHappen(!filterTitleTwoHappen)}
                name="option two?"
                color="primary"
              />
            }
            label="option two?"
          />
          <Button
            variant="text"
            color="error"
            onClick={() => handleClearFilter()}
          >
            clear
          </Button>
        </FormControlContainer>

        <FilterSection>
          <FilterSectionFlex style={{ width: "45%" }}>
            <TextField
              variant="outlined"
              label="Option One"
              size="medium"
              onChange={(e) => setFilterTitleOne(e.target.value)}
            />

            {inputFilterOne.map((x, i) => {
              return (
                <FormControlContainer key={i}>
                  <div style={{ flex: "100" }}>
                    <TextField
                      style={{ width: "100%" }}
                      variant="outlined"
                      label={`#${i + 1}/10`}
                      inputProps={{ style: { fontSize: 12 } }} // font size of input text
                      InputLabelProps={{
                        style: { fontSize: 12, color: "#889aff" },
                      }} // font size of input label
                      size="small"
                      name="filterOne"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </div>
                  {inputFilterOne.length - 1 === i &&
                    inputFilterOne.length !== 10 && (
                      <div style={{ flex: "2" }}>
                        <AddBoxIcon
                          color="primary"
                          onClick={() => handleAddClick("addFilterOne")}
                        ></AddBoxIcon>
                      </div>
                    )}
                  {inputFilterOne.length !== 1 && (
                    <div style={{ flex: "1" }}>
                      <DeleteIcon
                        color="error"
                        onClick={(e) => handleRemoveClick("removeFilterOne", i)}
                      ></DeleteIcon>
                    </div>
                  )}
                </FormControlContainer>
              );
            })}
          </FilterSectionFlex>
          {filterTitleTwoHappen && (
            <FilterSectionFlex style={{ width: "45%" }}>
              <TextField
                variant="outlined"
                label="Option Two"
                size="medium"
                onChange={(e) => setFilterTitleTwo(e.target.value)}
              />

              {inputFilterTwo.map((x, i) => {
                return (
                  <FormControlContainer key={i}>
                    <div style={{ flex: "100" }}>
                      <TextField
                        style={{ width: "100%" }}
                        variant="outlined"
                        label={`#${i + 1}/10`}
                        inputProps={{ style: { fontSize: 12 } }} // font size of input text
                        InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
                        size="small"
                        name="filterTwo"
                        onChange={(e) => handleInputChange(e, i)}
                      />
                    </div>

                    {inputFilterTwo.length - 1 === i &&
                      inputFilterTwo.length !== 10 && (
                        <div style={{ flex: "2" }}>
                          <AddBoxIcon
                            color="primary"
                            onClick={() => handleAddClick("addFilterTwo")}
                          ></AddBoxIcon>
                        </div>
                      )}
                    {inputFilterTwo.length !== 1 && (
                      <div style={{ flex: "1" }}>
                        <DeleteIcon
                          color="error"
                          onClick={(e) =>
                            handleRemoveClick("removeFilterTwo", i)
                          }
                        ></DeleteIcon>
                      </div>
                    )}
                  </FormControlContainer>
                );
              })}
            </FilterSectionFlex>
          )}
        </FilterSection>

        <Section>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={handleGenerateTable}
          >
            Generate Table
          </Button>
        </Section>

        <Section style={{ height: 400 }}>
          <Table>
            <Tr>
              <Td>{filterTitleOne}</Td>
              <Td>price</Td>
              <Td>stock</Td>
            </Tr>
            <Tr>
              <Td>
                <TableInput />
              </Td>
              <Td>
                <TableInput />
              </Td>
              <Td>
                <TableInput />
              </Td>
              <Td>
                <TableInput />
              </Td>
            </Tr>
          </Table>
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
