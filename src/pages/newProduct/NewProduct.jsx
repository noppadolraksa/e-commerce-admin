import styled from "styled-components";
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
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { userRequest } from "../../requestMethods";
import app from "../../firebase";

const textStyle = {
  maxWidth: "300px",
  marginBottom: "5px",
};

const Container = styled.div`
  flex: 4;
  margin-bottom: 30px;
  margin-right: 20px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const TextTitle = styled.h1`
  margin-bottom: 10px;
`;

const Text = styled.p``;
const UploadContainer = styled.form`
  margin-bottom: 10px;
`;
const UploadButton = styled.input``;
const ImagePreview = styled.img`
  width: 50px;
  height: 50px;
`;
const Form = styled.form``;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const headerStyles = {
  flex: 1,
  backgroundColor: "#ededed",
};

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
  const [promotion, setPromotion] = useState([]);
  const [rows, setRows] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategrories] = useState("");
  const [file, setFile] = useState({});
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [filterTitleOne, setFilterTitleOne] = useState("");
  const [filterTitleTwo, setFilterTitleTwo] = useState("");
  const [filterTitleTwoHappen, setFilterTitleTwoHappen] = useState(false);

  const [inputFilterOne, setInputFilterOne] = useState([""]);
  const [inputFilterTwo, setInputFilterTwo] = useState([""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;

    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    const arr = [];
    rows.map((item) => arr.push(item.price));

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            if (filterTitleTwoHappen) {
              const res = await userRequest.post(
                "https://my-shop-e-commerce.herokuapp.com/product/",
                {
                  title: title,
                  desc: desc,
                  img: downloadURL,
                  categories: categories,
                  brand: brand,
                  filterTitleOne: filterTitleOne,
                  promotion: promotion,
                  condition: condition,
                  filterTitleTwo: filterTitleTwo,
                  floorPrice: Math.min(...arr),
                  ceilPrice: Math.max(...arr),
                  product: rows,
                }
              );
            } else {
              const res = await userRequest.post(
                "https://my-shop-e-commerce.herokuapp.com/product/",
                {
                  title: title,
                  desc: desc,
                  img: downloadURL,
                  categories: categories,
                  brand: brand,
                  filterTitleOne: filterTitleOne,
                  promotion: promotion,
                  condition: condition,
                  floorPrice: Math.min(...arr),
                  ceilPrice: Math.max(...arr),
                  product: rows,
                }
              );
            }
            alert("create product successfully!");
          } catch (err) {
            if (err.response.status === 400) {
              alert(err.response.data);
            } else {
              console.error(err);
              alert("something went wrong..");
            }
          }
        });
      }
    );

    //
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClickUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      // const uploadImg = await userRequest.post(
      //   "https://my-shop-e-commerce.herokuapp.com/product/img",
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      // setImg(
      //   `https://my-shop-e-commerce.herokuapp.com/product/file/${uploadImg.data.filename}`
      // );
    } catch (err) {
      console.error(err);
    }
  };

  const handleRows = (e) => {
    const list = [...rows];
    const index = rows.findIndex((row) => row.id === e.id);
    e.name === "price"
      ? (list[index].price = e.value)
      : (list[index].stock = e.value);
    setRows(list);
  };

  const handlePromotion = (e) => {
    if (e.target.checked === true) {
      setPromotion([...promotion, e.target.name]);
    } else {
      const res = promotion.filter((item) => item !== e.target.name);
      setPromotion(res);
    }
  };

  const handleGenerateTable = async () => {
    const row = [];

    inputFilterOne.map((one, i) =>
      inputFilterTwo.map((two, j) =>
        row.push({
          filterProductsOne: one,
          filterProductsTwo: two,
          price: null,
          stock: null,
        })
      )
    );
    const res = await row.map((item, i) => (item.id = i));
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
    setInputFilterTwo("");
    setRows([]);
  };

  return (
    <Container>
      <TextTitle>New Product</TextTitle>
      <Wrapper>
        <Section>
          <TextField
            size="small"
            id="title"
            variant="outlined"
            label="Title"
            sx={{ mb: 1, width: 600 }}
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
        {console.log(file)}
        <UploadContainer>
          <InputImg
            type="file"
            name="file"
            accept="image/*"
            onChange={handleUploadImage}
          />

          {imagePreviewUrl && <ImagePreview src={imagePreviewUrl} />}
        </UploadContainer>

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
              <MenuItem value="shirt">Shirt</MenuItem>
              <MenuItem value="plain">Plain</MenuItem>
              <MenuItem value="women">Women</MenuItem>
              <MenuItem value="snack">Snack</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="shoes">Shoes</MenuItem>
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
                          style={{ cursor: "pointer" }}
                          onClick={() => handleAddClick("addFilterOne")}
                        ></AddBoxIcon>
                      </div>
                    )}
                  {inputFilterOne.length !== 1 && (
                    <div style={{ flex: "1" }}>
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
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
                        InputLabelProps={{
                          style: { fontSize: 12, color: "#889aff" },
                        }}
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
                            style={{ cursor: "pointer" }}
                            onClick={() => handleAddClick("addFilterTwo")}
                          ></AddBoxIcon>
                        </div>
                      )}
                    {inputFilterTwo.length !== 1 && (
                      <div style={{ flex: "1" }}>
                        <DeleteIcon
                          color="error"
                          style={{ cursor: "pointer" }}
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

        <Section>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Header>
              <TextField
                style={headerStyles}
                disabled
                color="secondary"
                size="small"
                value={filterTitleOne}
              />
              {filterTitleTwoHappen && (
                <TextField
                  style={headerStyles}
                  disabled
                  color="secondary"
                  size="small"
                  value={filterTitleTwo}
                />
              )}
              <TextField
                style={headerStyles}
                disabled
                color="secondary"
                size="small"
                value="price($)"
              />
              <TextField
                style={headerStyles}
                disabled
                color="secondary"
                size="small"
                value="stock"
              />
            </Header>
            {rows.map((item, i) => (
              <Body key={i}>
                <TextField
                  disabled
                  variant="outlined"
                  size="small"
                  value={item.filterProductsOne}
                ></TextField>

                {filterTitleTwoHappen && (
                  <TextField
                    disabled
                    variant="outlined"
                    size="small"
                    value={item.filterProductsTwo}
                  ></TextField>
                )}
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  name="price"
                  placeholder="fill here.."
                  onChange={(e) =>
                    handleRows({
                      name: e.target.name,
                      value: e.target.value,
                      id: i,
                    })
                  }
                ></TextField>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  name="stock"
                  placeholder="fill here.."
                  onChange={(e) =>
                    handleRows({
                      name: e.target.name,
                      value: e.target.value,
                      id: i,
                    })
                  }
                ></TextField>
              </Body>
            ))}
            <Button variant="contained" type="submit" sx={{ width: 100 }}>
              SUBMIT
            </Button>
          </Form>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default NewProduct;
