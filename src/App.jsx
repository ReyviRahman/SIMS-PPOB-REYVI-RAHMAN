import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import Layout from "./components/Layout";
import TopUpPage from "./pages/TopUpPage";
import TransactionPage from "./pages/TransactionPage";
import AkunPage from "./pages/AkunPage";
import { useSelector } from "react-redux";
import ServicePage from "./pages/ServicePage";

const PrivateRoute = () => {
  const token = useSelector((state) => state.auth.token);
  return token ? <Outlet /> : <Navigate to={"/login"} />;
};

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/topup" element={<TopUpPage />} />
            <Route path="/transaction" element={<TransactionPage />} />
            <Route path="/akun" element={<AkunPage />} />
            <Route path="/service" element={<ServicePage />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </>
  );
}

export default App;
