import React, { lazy, Suspense } from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactDOM  from "react-dom/client";

import Header from "./Components/Header";
import Body from "./Components/Body";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Error from "./Components/Error";
import RestaurentMenu from "./Components/RestaurantMenu";
import Cart from "./Components/Cart";

import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import { Provider } from "react-redux";
import appStore from './utils/appStore';
import UserContext from "./utils/UserContext";


const Grocery = lazy(() => import('./Components/Grocery'));

const AppLayout = () => {
    const [userName, setUserName] = useState();

  // Authentication
  useEffect(() => {
    // Make an API call and send username and password
    const data = {
      name: 'Hello, Nikhil',
    };
    setUserName(data.name);
  }, []);




  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName}}>
        <div className="app">
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
}      

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: '/grocery',
                element: (
                  <Suspense fallback={<h1>Loading...</h1>}>
                    <Grocery />
                  </Suspense>
                ),
            },
            {
                path:"/restaurants/:resId",
                element: <RestaurentMenu />,
            },
            {
              path: "/cart",
              element: <Cart />,
            },
        ],
        errorElement: <Error />,
    }, 
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);