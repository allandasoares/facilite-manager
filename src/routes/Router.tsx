import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from "../components/TopBar";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import ListSuppliers from "../pages/supplier/list/ListSuppliers";
import ListSuppliersCategories from "../pages/supplier-category/list/ListSuppliersCategory";
import RegisterSupplier from "../pages/supplier/register/RegisterSupplier";
import PrivateRoutes from "./PrivateRoutes";
import RegisterSupplierCategory from "../pages/supplier-category/register/RegisterSupplierCategory";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={RouteWithSideMenu(<Home />)} />
          <Route path="/home" element={RouteWithSideMenu(<Home />)} />
          <Route
            path="/suppliers"
            element={RouteWithSideMenu(<ListSuppliers />)}
          />
          <Route
            path="/suppliers/new"
            element={RouteWithSideMenu(<RegisterSupplier />)}
          />
          <Route
            path="/suppliers-categories"
            element={RouteWithSideMenu(<ListSuppliersCategories />)}
          />
          <Route
            path="/suppliers-categories/new"
            element={RouteWithSideMenu(<RegisterSupplierCategory />)}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function RouteWithSideMenu(component: JSX.Element) {
  return <TopBar>{component}</TopBar>;
}
