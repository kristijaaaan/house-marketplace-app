import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./useUser";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isAuth } = useUser();

  useEffect(() => {
    if (!isAuth && !isLoading) navigate("/sign-in");
  }, [isLoading, isAuth, navigate]);

  if (isAuth) return children;
}

export default ProtectedRoute;
