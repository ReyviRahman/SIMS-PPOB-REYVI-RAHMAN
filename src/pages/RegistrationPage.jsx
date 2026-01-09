import { AtSign, LockKeyhole, UserRound, Eye, EyeOff } from "lucide-react";
import illustrasiLogin from "../assets/illustrasi-login.png";
import logo from "../assets/logo.png";
import { useState } from "react";
import api from "../services/api";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [errorConfirm, setErrorConfirm] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setErrorConfirm(true);
      return;
    } else {
      setErrorConfirm(false);
    }

    try {
      const payload = {
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
      };

      Swal.fire({
        title: 'Sedang Memproses...',
        text: 'Mohon tunggu sebentar',
        allowOutsideClick: false, 
        showConfirmButton: false, 
        willOpen: () => {
            Swal.showLoading(); 
        }
      });

      const response = await api.post("/registration", payload);
      Swal.fire({
        icon: 'success',
        title: 'Registrasi Sukses',
        text: response.data.message,
        confirmButtonText: 'Lanjut Login',
      }).then(() => {
        navigate("/login");
      })
    } catch (error) {
      console.error("Register Error", error);
      Swal.fire({
        icon: 'error',
        title: 'Registrasi Gagal',
        text: error.response?.data?.message || "Terjadi kesalahan sistem"
      })
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
            Lengkapi data untuk <br /> membuat akun
          </h1>
          <form onSubmit={handleRegister}>
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
              <div className="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300">
                <div className={firstName ? "text-black" : "text-gray-400"}>
                  <UserRound size={15} />
                </div>
                <input
                  id="firstName"
                  name="first_name"
                  type="text"
                  placeholder="nama depan"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="block min-w-0 grow bg-white py-2 pr-3 pl-1  text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  required
                />
              </div>
              <div className="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300">
                <div className={lastName ? "text-black" : "text-gray-400"}>
                  <UserRound size={15} />
                </div>
                <input
                  id="lastName"
                  name="first_name"
                  type="text"
                  placeholder="nama belakang"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="block min-w-0 grow bg-white py-2 pr-3 pl-1  text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  required
                />
              </div>
              <div className="flex items-center rounded-md bg-white px-3 outline-1 outline-gray-300">
                <div className={password ? "text-black" : "text-gray-400"}>
                  <LockKeyhole size={15} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="buat password"
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
              <div>
                <div className={`flex items-center rounded-md bg-white px-3 outline-1 ${errorConfirm ? 'outline-red-500' : 'outline-gray-300'}`}>
                  <div
                    className={errorConfirm ? 'text-red-500' : (passwordConfirm ? "text-black" : "text-gray-400")}
                  >
                    <LockKeyhole size={15} />
                  </div>
                  <input
                    id="passwordConfirm"
                    name="password_confirm"
                    type={showPasswordConfirm ? "text" : "password"}
                    placeholder="konfirmasi password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="block min-w-0 grow bg-white py-2 pr-3 pl-1  text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    required
                  />
                  <div
                    className={"text-gray-400 cursor-pointer"}
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  >
                    {showPasswordConfirm ? (
                      <EyeOff size={15} />
                    ) : (
                      <Eye size={15} />
                    )}
                  </div>
                </div>
                {errorConfirm && <p className="text-red-500 text-xs text-right mt-1">password tidak sama</p>}
              </div>
            </div>
            <div className="flex mt-8">
              <button className="bg-red-600 w-full text-white rounded-md py-2 font-semibold cursor-pointer">
                Registrasi
              </button>
            </div>
          </form>
          <p className="text-sm text-center mt-5 text-gray-600">sudah punya akun? login <Link to={'/login'} className="text-red-500">di sini</Link> </p>
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
