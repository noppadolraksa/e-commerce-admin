import React, { useState } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import InputTitle from "../../components/productForm/InputTitle";
import InputBrand from "../../components/productForm/InputBrand";
import TextArea from "../../components/productForm/TextArea";
import ButtonResult from "../../components/productForm/ButtonResult";
import InputImage from "../../components/productForm/InputImage";
import SelectCategories from "../../components/productForm/SelectCategories";
import SelectCondition from "../../components/productForm/SelectCondition";
import CheckboxPromotion from "../../components/productForm/CheckboxPromotion";

import SwitchAndClearButton from "../../components/productForm/SwitchAndClearButton";
import FilterTitleAndTable from "../../components/productForm/FilterTitleAndTable";

const Container = styled.div`
  flex: 4;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextTitle = styled.h1`
  margin-bottom: 10px;
`;

const ErrorText = styled.span`
  color: red;
`;

const FormControlContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Section = styled.section`
  margin: 5px 0px 10px 5px;
`;

const NewProduct = () => {
  const [data, setData] = useState(null);
  const [file, setFile] = useState({});
  const [promotion, setPromotion] = useState([]);
  const [filterTitleOne, setFilterTitleOne] = useState("");
  const [filterTitleTwo, setFilterTitleTwo] = useState("");
  const [filterTitleTwoHappen, setFilterTitleTwoHappen] = useState(false);
  const [inputFilterOne, setInputFilterOne] = useState([""]);
  const [inputFilterTwo, setInputFilterTwo] = useState([""]);
  const [rows, setRows] = useState([]);

  const defaultValue = {
    title: "",
    brand: "",
    desc: "",
    img: "",
    promotion: [],
    condition: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue,
  });

  const handleClearFilter = () => {
    setInputFilterOne([inputFilterOne[0]]);
    setInputFilterTwo([inputFilterTwo[0]]);
    setRows([]);
  };

  return (
    <Container>
      <Wrapper>
        <TextTitle>Create Product</TextTitle>
        <form onSubmit={handleSubmit((data) => setData(data))}>
          <Section>
            <SelectCategories control={control} />
          </Section>
          <Section>
            <InputTitle
              control={control}
              defaultValue={defaultValue.title}
              errors={errors}
            />
            {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
          </Section>
          <Section>
            <InputBrand control={control} defaultValue={defaultValue.brand} />
            {errors.brand && <ErrorText>{errors.brand.message}</ErrorText>}
          </Section>
          <Section>
            <TextArea control={control} defaultValue={defaultValue.desc} />
            {errors.desc && <ErrorText>{errors.desc.message}</ErrorText>}
          </Section>
          <Section>
            <InputImage file={file} setFile={setFile} control={control} />
          </Section>
          <Section>
            <SelectCondition
              control={control}
              defaultValue={defaultValue.condition}
            />
          </Section>
          <Section>
            <CheckboxPromotion
              control={control}
              defaultValue={defaultValue.promotion}
              promotion={promotion}
              setPromotion={setPromotion}
            />
          </Section>
          <br />
          <hr />
          <FormControlContainer>
            <SwitchAndClearButton
              filterTitleTwoHappen={filterTitleTwoHappen}
              setFilterTitleTwoHappen={setFilterTitleTwoHappen}
              handleClearFilter={handleClearFilter}
            />
          </FormControlContainer>
          <FilterTitleAndTable
            filterTitleOne={filterTitleOne}
            filterTitleTwo={filterTitleTwo}
            setFilterTitleOne={setFilterTitleOne}
            setFilterTitleTwo={setFilterTitleTwo}
            inputFilterOne={inputFilterOne}
            inputFilterTwo={inputFilterTwo}
            setInputFilterOne={setInputFilterOne}
            setInputFilterTwo={setInputFilterTwo}
            filterTitleTwoHappen={filterTitleTwoHappen}
            rows={rows}
            setRows={setRows}
          />
          {console.log(rows)}

          <ButtonResult {...{ data }} />
        </form>
      </Wrapper>
    </Container>
  );
};

export default NewProduct;
