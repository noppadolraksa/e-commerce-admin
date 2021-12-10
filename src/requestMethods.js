import axios from "axios";

const BASE_URL = "https://my-shop-ecommerces.herokuapp.com/";
const persistRoot = JSON.parse(localStorage.getItem("persist:root"));
let TOKEN = "";
if (persistRoot) {
  TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)
    ?.currentUser?.accessToken;
}
//1# inspector > application > LocalStorage > http/localhost:3001 > Key = persist:root
//console.log(localStorage.getItem("persist:root"));
//2# parse text to JSON
// console.log(
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).currentUser)
//     .accessToken
// );

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
