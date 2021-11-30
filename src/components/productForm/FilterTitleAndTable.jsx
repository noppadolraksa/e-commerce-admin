import { Button, TextField } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";

const FilterSection = styled.section`
  border: 1px solid lightblue;
  background-color: #f0f0f0;
  border-radius: 5px;
  display: flex;
  margin-bottom: 10px;
  margin-right: 20px;
  justify-content: center;
  padding: 10px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 20px;
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 20px;
`;

const headerStyles = {
  flex: 1,
  backgroundColor: "#ededed",
  border: "0.5px solid lightGray",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
};

const FormControlContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FilterSectionFlex = styled.section`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const ButtonContainer = styled.div`
  margin-bottom: 20px;
`;

const FilterTitle = ({
  filterTitleOne,
  filterTitleTwo,
  setFilterTitleOne,
  setFilterTitleTwo,
  inputFilterOne,
  setInputFilterOne,
  inputFilterTwo,
  setInputFilterTwo,
  filterTitleTwoHappen,
  rows,
  setRows,
}) => {
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

  // handle click event of the Add button
  const handleAddClick = (filterOneOrTwo) => {
    if (filterOneOrTwo === "addFilterOne") {
      setInputFilterOne([...inputFilterOne, ""]);
    } else {
      setInputFilterTwo([...inputFilterTwo, ""]);
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

  const handleGenerateTable = async () => {
    const row = [];
    inputFilterOne.flatMap((one, i) =>
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

  const handleRows = (e) => {
    const list = [...rows];
    const index = rows.findIndex((row) => row.id === e.id);
    e.name === "price"
      ? (list[index].price = e.value)
      : (list[index].stock = e.value);
    setRows(list);
  };

  return (
    <div>
      <FilterSection>
        <FilterSectionFlex style={{ width: "45%" }}>
          <TextField
            style={{ marginBottom: "10px" }}
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
                    style={{ width: "100%", marginBottom: "5px" }}
                    variant="outlined"
                    label={`#${i + 1}/10`}
                    inputProps={{
                      style: { fontSize: 12 },
                    }} // font size of input text
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
              style={{ marginBottom: "10px" }}
              variant="outlined"
              label="Option Two"
              size="medium"
              onChange={(e) => setFilterTitleTwo(e.target.value)}
            />
            {inputFilterTwo.map((x, i) => {
              return (
                <FormControlContainer key={i}>
                  <div style={{ flex: "100", marginBottom: "5px" }}>
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
                        onClick={(e) => handleRemoveClick("removeFilterTwo", i)}
                      ></DeleteIcon>
                    </div>
                  )}
                </FormControlContainer>
              );
            })}
          </FilterSectionFlex>
        )}
      </FilterSection>
      <ButtonContainer>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={handleGenerateTable}
        >
          Generate Table
        </Button>
      </ButtonContainer>
      <div>
        <Header>
          <TextField
            style={headerStyles}
            size="small"
            disabled
            variant="outlined"
            value={filterTitleOne}
          />
          {filterTitleTwoHappen && (
            <TextField
              style={headerStyles}
              size="small"
              variant="outlined"
              disabled
              value={filterTitleTwo}
            />
          )}
          <TextField
            style={headerStyles}
            variant="outlined"
            size="small"
            disabled
            value="price(baht)"
          />
          <TextField
            style={headerStyles}
            variant="outlined"
            size="small"
            disabled
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
              style={{ flex: 1 }}
            ></TextField>
            {filterTitleTwoHappen && (
              <TextField
                style={{ flex: 1 }}
                disabled
                variant="outlined"
                size="small"
                value={item.filterProductsTwo}
              ></TextField>
            )}
            <TextField
              style={{ flex: 1 }}
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
              style={{ flex: 1 }}
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
      </div>
    </div>
  );
};

export default FilterTitle;
