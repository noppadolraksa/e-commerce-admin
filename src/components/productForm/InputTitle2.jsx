// import * as React from "react";
// import { Controller } from "react-hook-form";

// import {
//   TextField,
//   Checkbox,
//   Select,
//   MenuItem,
//   Switch,
//   RadioGroup,
//   FormControlLabel,
//   ThemeProvider,
//   Radio,
//   createMuiTheme,
//   Slider,
// } from "@material-ui/core";

// const InputTitle2 = ({ control }) => (
//   <div className="container">
//     <section>
//       <label>MUI Checkbox</label>
//       <Controller
//         name="Checkbox"
//         control={control}
//         render={({ field }) => (
//           <Checkbox
//             onChange={(e) => field.onChange(e.target.checked)}
//             checked={field.value}
//           />
//         )}
//       />
//     </section>

//     <section>
//       <label>Radio Group</label>
//       <Controller
//         render={({ field }) => (
//           <RadioGroup aria-label="gender" {...field}>
//             <FormControlLabel
//               value="female"
//               control={<Radio />}
//               label="Female"
//             />
//             <FormControlLabel value="male" control={<Radio />} label="Male" />
//           </RadioGroup>
//         )}
//         name="RadioGroup"
//         control={control}
//       />
//     </section>

//     <section>
//       <label>MUI TextField</label>
//       <Controller
//         render={({ field }) => <TextField {...field} />}
//         name="TextField"
//         control={control}
//       />
//     </section>

//     <section>
//       <label>MUI Select</label>
//       <Controller
//         render={({ field }) => (
//           <Select {...field}>
//             <MenuItem value={10}>Ten</MenuItem>
//             <MenuItem value={20}>Twenty</MenuItem>
//             <MenuItem value={30}>Thirty</MenuItem>
//           </Select>
//         )}
//         name="Select"
//         control={control}
//       />
//     </section>

//     <section>
//       <label>MUI Switch</label>
//       <Controller
//         name="switch"
//         control={control}
//         render={({ field }) => (
//           <Switch
//             onChange={(e) => field.onChange(e.target.checked)}
//             checked={field.value}
//           />
//         )}
//       />
//     </section>

//     <section>
//       <label>MUI Slider</label>
//       <Controller
//         name="MUI_Slider"
//         control={control}
//         defaultValue={[0, 10]}
//         render={({ field }) => (
//           <Slider
//             {...field}
//             onChange={(_, value) => {
//               field.onChange(value);
//             }}
//             valueLabelDisplay="auto"
//             max={10}
//             step={1}
//           />
//         )}
//       />
//     </section>

//     {/* <section>
//         <label>MUI autocomplete</label>
//         <MuiAutoComplete control={control} />
//       </section> */}
//   </div>
// );

// export default InputTitle2;
