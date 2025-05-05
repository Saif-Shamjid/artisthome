// src/components/Layout.jsx
import { Outlet, Link } from "react-router-dom";
import { AuthProvider,  } from "../contex/AuthContex";
import ArtisanFooter from "./Footer";
import NavBar from "./NavBar";

const Layout = () => {
  
  
  return (
    <AuthProvider>
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      <ArtisanFooter />
    </div>
    </AuthProvider>
  );
};

export default Layout;