import { Navigate, Route, Routes } from "react-router-dom";
import { AuthPage, SignUpPage } from "../pages";

export const AuthRoutes = () => {
  /**
   * TODO:
   * /forgot-password/request [+email=...]
   * /forgot-password/recovery [+?token=...]
   */
  return (
    <Routes>
      <Route path="/signin" element={<AuthPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/*" element={<Navigate to={"/auth/signin"} />} />
    </Routes>
  );
};
