import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import MainLayout from "./Layout/MainLayout";
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import ProductDetails from "./Pages/ProductDetails";
import Categories from "./Pages/Categories";
import CategoriesDetails from "./Components/CategoriesDetails/CategoriesDetails";
import Products from "./Components/Products/Products";
import Cart from "./Pages/Cart";
import SigninToSee from "./Pages/SigninToSee";
import ProtectedRouter from "./Components/ProtectedRouter/ProtectedRouter";
import Search from "./Pages/Search";

  
  const router =createBrowserRouter([
    {
        path:'/',
        element:<MainLayout />,
        children:[
            {index: true,
                element:<Home />
            },{
                path:'register',
                element :<Register />
            },{
                path:'login',
                element :<Login />
            },{
                path:'cart',
                element :<ProtectedRouter><Cart/></ProtectedRouter>
            },{
                path:'*',
                element :<NotFound />
            },{
                path:'search',
                element :<Search />
            },{
                path:'signinToSee',
                element :<SigninToSee />
            },{
                path:'product/:id',
                element :<ProductDetails />
            },{
                path:'categories',
                element :<Categories />,
                children :[
                    {
                        index:true,
                        element:<Products title="Latest Products" limit={10} showSeeMore={true}/>
                    },{
                        path:':category',
                        element :<CategoriesDetails />

                    }
                ]
            }
        ]
    }
])

export default router;

