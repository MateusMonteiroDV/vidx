import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import Protected from "./protected";
import { isAuthenticated } from "./helper";
import Home from "../pages/home";
import Login from "../pages/loginPage";
import Signup from "../pages/registrationPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        element={<Protected />}
      >

        <Route path= "/home" element={<Home />} />
      
      </Route>
      <Route
        path="login"
        element={<Login />}
        loader={async () => await isAuthenticated()}
      />
      <Route
        path="signup"
        element={<Signup />}
        loader={async () => await isAuthenticated()}
      />
    
    </Route>
  )
);

const Index = () => {
  return <RouterProvider router={router} />;
};

export default Index;