import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home.page';
import Login from '../pages/login/Login.page';
import PrivateRoutes from './PrivateRoutes';
import CreatProductPage from '../pages/product/create/CreateProduct.page';
import TopBar from '../components/layout/TopBar';
import CreateSupplierPage from '../pages/supplier/create/CreateSupplier.page';
import UpdateSupplierPage from '../pages/supplier/update/UpdateSupplier.page';
import ListProductsPage from '../pages/product/list/ListProducts.page';
import UpdateProductPage from '../pages/product/update/UpdateProduct.page';
import CreateProductCategoryPage from '../pages/product-category/create/CreateProductCategory.page';
import UpdateProductCategoryPage from '../pages/product-category/update/UpdaeProductCategory.page';
import ProductVariationsPage from '../pages/product/variation/ProductVariations.page';
import ListProductsCategoryPage from '../pages/product-category/list/ListProductsCategory.page';
import CreateSupplierCategoryPage from '../pages/supplier-category/create/CreateSupplierCategory.page';
import ListSuppliersCategoryPage from '../pages/supplier-category/list/ListSuppliersCategory.page';
import UpdateSupplierCategoryPage from '../pages/supplier-category/update/UpdateSupplierCategory.page';
import ListVariationsPage from '../pages/variation/list/ListVariations.page';
import CreateVariationPage from '../pages/variation/create/CreateVariation.page';
import CreateVariationOptionsPage from '../pages/variation-option/register/RegisterVariationOptions.page';
import UpdateVariationPage from '../pages/variation/update/UpdateVariation.page';
import ListSuppliersPage from '../pages/supplier/list/ListSuppliers.page';

function RouteWithSideMenu(component: JSX.Element) {
  return <TopBar>{component}</TopBar>;
}

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
            element={RouteWithSideMenu(<ListSuppliersPage />)}
          />
          <Route
            path="/suppliers/new"
            element={RouteWithSideMenu(<CreateSupplierPage />)}
          />
          <Route
            path="/suppliers/edit/:supplierId"
            element={RouteWithSideMenu(<UpdateSupplierPage />)}
          />
          <Route
            path="/suppliers-categories"
            element={RouteWithSideMenu(<ListSuppliersCategoryPage />)}
          />
          <Route
            path="/suppliers-categories/new"
            element={RouteWithSideMenu(<CreateSupplierCategoryPage />)}
          />
          <Route
            path="/suppliers-categories/edit/:supplierCategoryId"
            element={RouteWithSideMenu(<UpdateSupplierCategoryPage />)}
          />
          <Route
            path="/products"
            element={RouteWithSideMenu(<ListProductsPage />)}
          />
          <Route
            path="/products/new"
            element={RouteWithSideMenu(<CreatProductPage />)}
          />
          <Route
            path="/products/edit/:productId"
            element={RouteWithSideMenu(<UpdateProductPage />)}
          />
          <Route
            path="/products/:productId/variations"
            element={RouteWithSideMenu(<ProductVariationsPage />)}
          />
          <Route
            path="/products-categories"
            element={RouteWithSideMenu(<ListProductsCategoryPage />)}
          />
          <Route
            path="/products-categories/new"
            element={RouteWithSideMenu(<CreateProductCategoryPage />)}
          />
          <Route
            path="/products-categories/edit/:productCategoryId"
            element={RouteWithSideMenu(<UpdateProductCategoryPage />)}
          />
          <Route
            path="/variations"
            element={RouteWithSideMenu(<ListVariationsPage />)}
          />
          <Route
            path="/variations/new"
            element={RouteWithSideMenu(<CreateVariationPage />)}
          />
          <Route
            path="/variations/edit/:variationId"
            element={RouteWithSideMenu(<UpdateVariationPage />)}
          />
          <Route
            path="/variations-options/variations/:variationId"
            element={RouteWithSideMenu(<CreateVariationOptionsPage />)}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
