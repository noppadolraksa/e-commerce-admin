import React, { useState } from "react";
import styled from "styled-components";
import { Controller } from "react-hook-form";

const ImagePreview = styled.img`
  width: 50px;
  height: 50px;
`;

const InputImage = ({ control, file, setFile, img }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section>
      <Controller
        render={({ field }) => (
          <input
            {...field}
            onChange={handleUploadImage}
            type="file"
            name="file"
            accept="image/*"
          />
        )}
        name="img"
        control={control}
      />
      {imagePreviewUrl ? (
        <ImagePreview alt="image preview" src={imagePreviewUrl} />
      ) : (
        <ImagePreview alt="image preview" src={img} />
      )}
    </section>
  );
};

export default InputImage;
