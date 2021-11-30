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

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/apiCalls";

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
  const [categories, setCategories] = useState("");
  const [condition, setCondition] = useState("");
  const [filterTitleOne, setFilterTitleOne] = useState("");
  const [filterTitleTwo, setFilterTitleTwo] = useState("");
  const [filterTitleTwoHappen, setFilterTitleTwoHappen] = useState(false);
  const [inputFilterOne, setInputFilterOne] = useState([""]);
  const [inputFilterTwo, setInputFilterTwo] = useState([""]);
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();

  const defaultValue = {
    title: "",
    brand: "",
    desc: "",
    img: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue,
  });

  const handleAddProduct = async (data) => {
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    const arr = [];
    rows.map((item) => arr.push(item.price));

    uploadTask.on(
      "state_changed",
      (snapshot) => {
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
        console.error("upload failure..");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            if (filterTitleTwoHappen) {
              await addProduct(
                {
                  title: data.title,
                  desc: data.desc,
                  img: downloadURL,
                  categories: categories,
                  brand: data.brand,
                  filterTitleOne: filterTitleOne,
                  promotion: promotion,
                  condition: condition,
                  filterTitleTwo: filterTitleTwo,
                  floorPrice: Math.min(...arr),
                  ceilPrice: Math.max(...arr),
                  product: rows,
                },
                dispatch
              );
            } else {
              await addProduct(
                {
                  title: data.title,
                  desc: data.desc,
                  img: downloadURL,
                  categories: categories,
                  brand: data.brand,
                  filterTitleOne: filterTitleOne,
                  promotion: promotion,
                  condition: condition,
                  floorPrice: Math.min(...arr),
                  ceilPrice: Math.max(...arr),
                  product: rows,
                },
                dispatch
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
  };

  const handleClearFilter = () => {
    setInputFilterOne([inputFilterOne[0]]);
    setFilterTitleOne([filterTitleOne]);
    setFilterTitleTwoHappen(false);
    setRows([]);
  };

  return (
    <Container>
      <Wrapper>
        <TextTitle>Create Product</TextTitle>
        <form onSubmit={handleSubmit((data) => handleAddProduct(data))}>
          <Section>
            <SelectCategories
              control={control}
              categories={categories}
              setCategories={setCategories}
            />
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
            <InputImage
              file={file}
              setFile={setFile}
              control={control}
              img={defaultValue.img}
            />
          </Section>
          <Section>
            <SelectCondition
              control={control}
              defaultValue={defaultValue.condition}
              condition={condition}
              setCondition={setCondition}
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

          <ButtonResult {...{ data }} />
        </form>
      </Wrapper>
    </Container>
  );
};

export default NewProduct;
