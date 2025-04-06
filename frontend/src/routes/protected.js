import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../context/authSlice";
import Home from "../pages/home";


const Protected = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return token ? (
     <Home>
      { <Outlet />}
     </Home>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default Protected;