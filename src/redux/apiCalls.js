import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import {
  getProductStart,
  getProductFailure,
  getProductSuccess,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "./productRedux";
import { publicRequest, userRequest } from "../requestMethods";

// fill username and password then check them to server
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data)); //name email whatever
    window.location.href = "/";
  } catch (err) {
    if (err.response.data === "Token is not valid!") {
      alert(
        `Error status : ${err.response.status} ${err.response.data} Please sign in again..`
      );
    } else {
      alert(`Error status : ${err.response.status} ${err.response.data}`);
    }
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch, user) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/product", user);
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/product/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    const res = await userRequest.put(`/product/${id}`, product);
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    if (err.response.data === "Token is not valid!") {
      alert(
        `Error status : ${err.response.status} ${err.response.data} Please sign in again..`
      );
    } else {
      alert(`Error status : ${err.response.status} ${err.response.data}`);
    }
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/product`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
