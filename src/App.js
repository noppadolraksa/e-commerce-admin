import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import ProductList from "./pages/productList/ProductList";

import UpdateProduct from "./pages/updateProduct/UpdateProduct";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import LoginSuccess from "./pages/login/LoginSuccess";

function App() {
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);

  return (
    <Router>
      <Switch>
        <Route path="/login">{admin ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/loginsuccess">
          <LoginSuccess />
        </Route>
        {admin ? (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <UpdateProduct />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
            </div>
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </Router>
  );
}

export default App;
