import { AtSign, UserRound } from "lucide-react";
import defaultProfile from "../assets/profile-photo.png";
import { useState } from "react";

export default function AkunPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <div className="sm:px-70 px-4 py-4">
      <div className="flex justify-center">
        <img
          src={defaultProfile}
          alt="Profile Photo"
          className="w-30 h-30 rounded-full"
        />
      </div>
      <h1 className="text-center font-semibold text-2xl mt-2 mb-4">
        Kristanto Wibowo
      </h1>
      <label htmlFor="email">Email</label>
      <div className="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300 my-4">
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
      <label htmlFor="firstName">Nama Depan</label>
      <div className="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300 my-4">
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
      <label htmlFor="lastName">Nama Belakang</label>
      <div className="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300 my-4">
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

      <button className="border border-red-600 w-full text-red-600 rounded-md py-2 mt-4 font-medium cursor-pointer">
        Edit Profile
      </button>

      <button className="bg-red-600 w-full text-white rounded-md py-2 font-medium cursor-pointer mt-6">
        Logout
      </button>

      
    </div>
  );
}
