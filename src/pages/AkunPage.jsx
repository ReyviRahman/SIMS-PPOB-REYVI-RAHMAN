import { AtSign, CircleCheck, LoaderCircle, Pencil, UserRound } from "lucide-react";
import defaultProfile from "../assets/profile-photo.png";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logout, updateProfile } from "../redux/slices/authSlice";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AkunPage() {
  const dispatch = useDispatch();
  const { user, isProfileLoading } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfileImage, setIsLoadingProfileImage] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [errorProfile, setErrorProfile] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    } else {
      setEmail(user.email);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setProfileImage(user.profile_image);
    }
  }, [dispatch, user]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 100 * 1024) {
      setErrorImage("Batas maksimal gambar 100 kb");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    setIsLoadingProfileImage(true);
    try {
      const response = await api.put("/profile/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(updateProfile(response.data.data));
    } catch (error) {
      setErrorImage(
        error.response?.data?.message || "Terjadi Kesalahan Sistem"
      );
    } finally {
      setErrorImage("");
      setIsLoadingProfileImage(false);
      Swal.fire({
        icon: <CircleCheck />,
        title: "Berhasil!",
        text: "Gambar Profil Anda telah diperbarui.",
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444", 
      });
    }
  };

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      const response = await api.put("/profile/update", {
        first_name: firstName,
        last_name: lastName,
      });
      dispatch(updateProfile(response.data.data));
    } catch (error) {
      console.error("Error Update Profile", error);
      setErrorProfile(error.response?.data?.message);
    } finally {
      setErrorProfile("");
      setIsLoading(false);
      setIsEdit(false);
      Swal.fire({
        icon: <CircleCheck />,
        title: "Berhasil!",
        text: "Data profil Anda telah diperbarui.",
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444", 
      });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="sm:px-70 px-4 py-4">
      {isLoadingProfileImage || isProfileLoading ? (
        <div className="animate-pulse flex justify-center">
          <div className="w-32 h-32 rounded-full bg-gray-200"></div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="relative">
            <img
              onClick={() => fileInputRef.current.click()}
              src={
                profileImage.includes("/null") || profileImage == ""
                  ? defaultProfile
                  : profileImage
              }
              alt="Profile Photo"
              className="w-32 h-32 rounded-full object-cover border border-gray-200 cursor-pointer"
            />
            <div
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-white border border-gray-300 p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors text-black"
            >
              <Pencil size={15} />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>
      )}

      {errorImage && (
        <h1 className="text-red-500 font-medium text-sm text-center">
          {errorImage}
        </h1>
      )}
      {isProfileLoading ? (
        <div className="h-5 w-32 bg-gray-200 rounded mx-auto mt-4"></div>
      ) : (
        <h1 className="text-center font-semibold text-2xl mt-2 mb-4">
          {`${user?.first_name} ${user?.last_name}`}
        </h1>
      )}
      <label htmlFor="email">Email</label>
      <div className="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300 my-4">
        <div className={email ? "text-black" : "text-gray-400"}>
          <AtSign size={15} />
        </div>
        <input
          readOnly={true}
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
      <label htmlFor="firstName">Nama Depan</label>
      <div className="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300 my-4">
        <div className={firstName ? "text-black" : "text-gray-400"}>
          <UserRound size={15} />
        </div>
        <input
          disabled={isProfileLoading}
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
      <label htmlFor="lastName">Nama Belakang</label>
      <div className="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300 my-4">
        <div className={lastName ? "text-black" : "text-gray-400"}>
          <UserRound size={15} />
        </div>
        <input
          disabled={isProfileLoading}
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
      {errorProfile && (
        <h1 className="text-sm text-red-600"> {errorProfile} </h1>
      )}

      {isEdit ? (
        <>
          <button
            disabled={isLoading}
            onClick={handleUpdateProfile}
            className={`bg-red-600 w-full text-white rounded-md py-2 mt-4 font-medium ${
              isLoading ? "cursor-default" : "cursor-pointer"
            } flex justify-center`}
          >
            {isLoading ? (
              <>
                <LoaderCircle className="animate-spin" />
                <span className="ms-2">Menyimpan...</span>
              </>
            ) : (
              "Simpan"
            )}
          </button>
          <button
            disabled={isLoading}
            onClick={() => {
              setIsEdit(!isEdit);
              if (user) {
                setFirstName(user.first_name);
                setLastName(user.last_name);
              }
            }}
            className="bg-gray-400 w-full text-white rounded-md py-2 font-medium cursor-pointer mt-6 "
          >
            Batalkan
          </button>
        </>
      ) : (
        <>
          <button
            disabled={isLoadingProfileImage}
            onClick={() => setIsEdit(!isEdit)}
            className="border border-red-600 w-full text-red-600 rounded-md py-2 mt-4 font-medium cursor-pointer"
          >
            Edit Profile
          </button>
          <button
            disabled={isLoadingProfileImage}
            onClick={handleLogout}
            className="bg-red-600 w-full text-white rounded-md py-2 font-medium cursor-pointer mt-6"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
