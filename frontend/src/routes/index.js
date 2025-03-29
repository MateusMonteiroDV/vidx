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
import InstructorForm from "../pages/formInstructor"
import CreateCourse from "../pages/createCourse"

const router = createBrowserRouter(
  createRoutesFromElements(
   <>
      
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

   <Route path="/" element={<Protected />}>
  
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="instructor" element={<InstructorForm />} />
      <Route path="createCourse" element={<CreateCourse />} />
  
  
</Route>

</>
      
  )
);

const Index = () => {
  return <RouterProvider router={router} />;
};

export default Index;