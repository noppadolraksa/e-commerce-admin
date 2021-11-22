 <fieldset style={{ width: 200, color: "blue", marginBottom: "5px" }}>
        <legend>
          <Text>description</Text>
        </legend>
        <Textarea
          style={{ width: 500, border: "none", minHeight: "100px" }}
          // {...register("desc", {
          //   required: "you must specify a desc",
          //   minLength: {
          //     value: 10,
          //     message: "desc is too short",
          //   },
          //   maxLength: {
          //     value: 500,
          //     message: "desc has 500 characters limit",
          //   },
          // })}
          placeholder="it can contain up to 500 characters.."
          aria-label="minimum height"
        />
        {errors.desc && <ErrorText>{errors.desc.message}</ErrorText>}
      </fieldset>
      <InputImg
        style={{ marginBottom: 5 }}
        type="file"
        name="img"
        accept="image/*"
      />

      <Section>
        <Controller
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categories*</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                sx={textStyle}
                {...field}
                // inputRef={register("categories", {
                //   required: "you must specify categories",
                // })}
              >
                <MenuItem value="Shirt">Shirt</MenuItem>
                <MenuItem value="Plain">Plain</MenuItem>
                <MenuItem value="Women">Women</MenuItem>
              </Select>
            </FormControl>
          )}
          name="categories"
          control={control}
        />
      </Section>
      {errors.categories && <ErrorText>{errors.categories.message}</ErrorText>}
      // <Box sx={{ display: "flex" }}>
      //   <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
      //     <FormLabel component="legend">Promotion</FormLabel>
      //     <FormGroup>
      //       <FormControlLabel
      //         control={
      //           <Checkbox
      //             size="small"
      //             onChange={handlePromotion}
      //             name="ร้านค้าแนะนำ"
      //           />
      //         }
      //         label="ร้านค้าแนะนำ"
      //       />
      //       <FormControlLabel
      //         control={
      //           <Checkbox
      //             size="small"
      //             onChange={handlePromotion}
      //             name="exclusive price"
      //           />
      //         }
      //         label="exclusive price"
      //       />
      //       <FormControlLabel
      //         control={
      //           <Checkbox
      //             size="small"
      //             onChange={handlePromotion}
      //             name="only9.9$"
      //           />
      //         }
      //         label="only9.9$"
      //       />
      //       <FormControlLabel
      //         control={
      //           <Checkbox
      //             size="small"
      //             onChange={handlePromotion}
      //             name="10%cashback"
      //           />
      //         }
      //         label="10%cashback"
      //       />
      //       <FormControlLabel
      //         control={
      //           <Checkbox
      //             size="small"
      //             onChange={handlePromotion}
      //             name="9.9$free shipping"
      //           />
      //         }
      //         label="9.9$free shipping"
      //       />
      //     </FormGroup>
      //     <FormHelperText>these can be selected more than one</FormHelperText>
      //   </FormControl>
      // </Box>
