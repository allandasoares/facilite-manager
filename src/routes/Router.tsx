import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home.page";
import Login from "../pages/login/Login.page";
import ListSuppliers from "../pages/supplier/list/ListSuppliers.page";
import ListSuppliersCategory from "../pages/supplier-category/list/ListSuppliersCategory.page";
import RegisterSupplier from "../pages/supplier/register/RegisterSupplier.page";
import PrivateRoutes from "./PrivateRoutes";
import RegisterSupplierCategory from "../pages/supplier-category/register/RegisterSupplierCategory.page";
import ListProducts from "../pages/product/list/ListProducts.page";
import RegisterProduct from "../pages/product/register/RegisterProduct.page";
import TopBar from "../components/layout/TopBar";
import ListProductsCategory from "../pages/product-category/list/ListProductsCategory.page";
import RegisterProductCategory from "../pages/product-category/register/RegisterProductCategory.page";
import ListVariations from "../pages/variation/list/ListVariations.page";
import RegisterVariation from "../pages/variation/register/RegisterVariation.page";
import RegisterVariationOptions from "../pages/variation-option/register/RegisterVariationOptions.page";
import ProductVariations from "../pages/product/variation/ProductVariations.page";

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
            element={RouteWithSideMenu(<ListSuppliersCategory />)}
          />
          <Route
            path="/suppliers-categories/new"
            element={RouteWithSideMenu(<RegisterSupplierCategory />)}
          />
          <Route
            path="/products"
            element={RouteWithSideMenu(<ListProducts />)}
          />
          <Route
            path="/products/:productId/variations"
            element={RouteWithSideMenu(<ProductVariations />)}
          />
          <Route
            path="/products/new"
            element={RouteWithSideMenu(<RegisterProduct />)}
          />
          <Route
            path="/products-categories"
            element={RouteWithSideMenu(<ListProductsCategory />)}
          />
          <Route
            path="/products-categories/new"
            element={RouteWithSideMenu(<RegisterProductCategory />)}
          />
          <Route
            path="/variations"
            element={RouteWithSideMenu(<ListVariations />)}
          />
          <Route
            path="/variations/new"
            element={RouteWithSideMenu(<RegisterVariation />)}
          />
          <Route
            path="/variations-options/variations/:variationId"
            element={RouteWithSideMenu(<RegisterVariationOptions />)}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function RouteWithSideMenu(component: JSX.Element) {
  return <TopBar>{component}</TopBar>;
}
