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
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import { AuthProvider } from './contex/AuthContex.jsx';
import Layout from './components/Layout.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/details/:id", // Added parameter for product ID
        element: <ProductDetailPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/products",
        element: <AllProductsPage />,
      },
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/user",
        element: <UserProfilePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <RouterProvider router={router} />
    
  </StrictMode>,
)
