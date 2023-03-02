import { useEffect, useState } from "react";
import Aos from "aos";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Review from "./pages/Review/Review";
import Shop from "./pages/Shop/Shop";
import Contact from "./pages/Contact/Contact";
import ProductDetail from "./pages/ProductDetail/index";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ThankYou from "./pages/ThankYou/ThankYou";
import Profile from "./pages/Profile/Profile";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import DefaultLayout from "./admin/components/Layout/DefaultLayout";
import Dashboard from "./admin/pages/Dashboard";
import Order from "./admin/pages/Order";
import Product from "./admin/pages/Product";
import User from "./admin/pages/User";
import NoMatch from "./pages/NoMatch";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddUser from "./admin/components/Users/AddUser";
import EditUser from "./admin/components/Users/EditUser";
import AddProduct from "./admin/components/Product/AddProduct";
import Category from "./admin/pages/Category";
import AddCategory from "./admin/components/Categories/AddCategories";
import EditProduct from "./admin/components/Product/EditProduct";
import EditCategories from "./admin/components/Categories/EditCategories";
import ViewUser from "./admin/components/Users/ViewUser";
import ViewProduct from "./admin/components/Product/ViewProduct";
import ChangeAccount from "./admin/components/Account/ChangeAccount";
import Checkout from "./pages/Checkout/Checkout";
import OrderUser from "./pages/OrderUser/OrderUser";

function App() {
  // chạy thư viên Aos
  useEffect(() => {
    Aos.init();
  }, []);


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/review" element={<Review />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/" element={<Profile />} />
        <Route path="/profile/update/:id" element={<Profile />} />
        <Route path="/orderUser" element={<OrderUser />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="*" element={<ErrorPage />} />


        <Route
          path="/admin"
          element={
            <DefaultLayout>
              <Dashboard />
            </DefaultLayout>
          }
        />
        <Route
          path="/products"
          element={
            <DefaultLayout>
              <Product />
            </DefaultLayout>
          }
        />
        <Route
          path="/products/add-product"
          element={
            <DefaultLayout>
              <AddProduct />
            </DefaultLayout>
          }
        />
        <Route
          path={`/products/edit-product/:id`}
          element={
            <DefaultLayout>
              <EditProduct />
            </DefaultLayout>
          }
        />
        <Route
          path={`products/view-product/:idItem`}
          element={
            <DefaultLayout>
              <ViewProduct />
            </DefaultLayout>
          }
        />
        <Route
          path="/users"
          element={
            <DefaultLayout>
              <User />
            </DefaultLayout>
          }
        />
        <Route
          path="/users/add-user"
          element={
            <DefaultLayout>
              <AddUser />
            </DefaultLayout>
          }
        />
        <Route
          path="/users/view-user/:idUser"
          element={
            <DefaultLayout>
              <ViewUser />
            </DefaultLayout>
          }
        />
        <Route
          path={`/users/edit-user/:id`}
          element={
            <DefaultLayout>
              <EditUser />
            </DefaultLayout>
          }
        />
        <Route
          path="/users/change-account/:idAccount"
          element={
            <DefaultLayout>
              <ChangeAccount />
            </DefaultLayout>
          }
        />
        <Route
          path="/orders"
          element={
            <DefaultLayout>
              <Order />
            </DefaultLayout>
          }
        />
        <Route
          path="/categories"
          element={
            <DefaultLayout>
              <Category />
            </DefaultLayout>
          }
        />
        <Route
          path="/categories/add-category"
          element={
            <DefaultLayout>
              <AddCategory />
            </DefaultLayout>
          }
        />
        <Route
          path={`/categories/edit-categories/:id`}
          element={
            <DefaultLayout>
              <EditCategories />
            </DefaultLayout>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
export default App;
