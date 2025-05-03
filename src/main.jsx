import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import App from './App.jsx'
import ProductDetailPage from './components/ProductDetailPage.jsx';
import CheckoutPage from './components/CheckoutPage.jsx';
import AllProductsPage from './components/AllProducts.jsx';
import AdminDashboard from './components/AdminPanel/AdminDashboard.jsx';
import UserProfilePage from './components/UserProfilePage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/details",
    element: <ProductDetailPage></ProductDetailPage>,
  },
  {
    path: "/checkout",
    element: <CheckoutPage></CheckoutPage>,
  },
  {
    path: "/products",
    element: <AllProductsPage></AllProductsPage>,
  },
  {
    path: "/admin",
    element: <AdminDashboard></AdminDashboard>,
  },
  {
    path:"/user",
    element: <UserProfilePage></UserProfilePage>,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    
  </StrictMode>,
)
