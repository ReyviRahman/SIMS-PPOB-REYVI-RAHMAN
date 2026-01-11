import { AtSign, LockKeyhole, UserRound, Eye, EyeOff, X } from "lucide-react";
import illustrasiLogin from "../assets/illustrasi-login.png";
import logo from "../assets/logo.png";
import { useState } from "react";
import api from "../services/api";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email: email,
        password: password,
      };
      Swal.fire({
        title: "Sedang Memproses...",
        text: "Mohon tunggu sebentar",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      const response = await api.post("/login", payload);
      const token = response.data.data.token;
      dispatch(loginSuccess({ token: token }));
      Swal.close();
      navigate("/");
    } catch (error) {
      console.error("Login Error", error);
      Swal.close();
      setErrorLogin(
        error.response?.data?.message || "Terjadi kesalahan sistem"
      );
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 ">
      <div className="my-auto sm:py-0 py-10">
        <div className="sm:px-25 px-8">
          <div className="flex items-center justify-center gap-2">
            <img src={logo} alt="Logo" />
            <h1 className="text-xl font-semibold">SIMS PPOB</h1>
          </div>
          <h1 className="text-2xl font-semibold text-center mt-8">
            Masuk atau buat akun <br /> untuk memulai
          </h1>
          <form onSubmit={handleLogin}>
            <div className="space-y-8 mt-8">
              <div className="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300">
                <div className={email ? "text-black" : "text-gray-400"}>
                  <AtSign size={15} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="masukan email anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block min-w-0 grow bg-white py-2 pr-3 pl-1  text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  required
                />
              </div>
              <div
                className={`flex items-center rounded-md bg-white px-3 outline-1 ${
                  errorLogin ? "outline-red-600" : "outline-gray-300"
                }`}
              >
                <div
                  className={
                    errorLogin
                      ? "text-red-600"
                      : password
                      ? "text-black"
                      : "text-gray-400"
                  }
                >
                  <LockKeyhole size={15} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="masukan password anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block min-w-0 grow bg-white py-2 pr-3 pl-1  text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  required
                />
                <div
                  className={"text-gray-400 cursor-pointer"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </div>
              </div>
            </div>
            <div className="flex mt-8">
              <button className="bg-red-600 w-full text-white rounded-md py-2 font-semibold cursor-pointer">
                Masuk
              </button>
            </div>
          </form>
          <p className="text-sm text-center mt-5 text-gray-600">
            belum punya akun? registrasi <Link to={"/register"} className="text-red-500"> di sini</Link>
          </p>
          {errorLogin && 
            <div className="bg-red-200 mt-20 px-4 py-2 rounded flex justify-between items-center">
              <h1 className="text-red-600 text-sm">{errorLogin}</h1>
              <X onClick={() => setErrorLogin("")} className="text-red-600 text-sm cursor-pointer" size={12}>x</X>
            </div>
          }
        </div>
      </div>
      <div className="h-screen">
        <img
          src={illustrasiLogin}
          alt="Ilustrasi Login"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
