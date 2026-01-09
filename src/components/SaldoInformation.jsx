import bgSaldo from "../assets/bg-saldo.png";
import defaultProfile from "../assets/profile-photo.png";
import { Eye } from "lucide-react";

export default function SaldoInformation() {
  return (
    <div className="flex sm:flex-row flex-col gap-4">
      <div className="flex-1">
        <img
          src={defaultProfile}
          alt="Profile Photo"
          className="w-17 h-17 rounded-full"
        />
        <div className="mt-3">
          <h1 className="text-lg font-medium">Selamat datang,</h1>
          <h1 className="text-2xl font-semibold">Kristanto Wibowo</h1>
        </div>
      </div>
      <div
        className="p-6 grow rounded-xl bg-cover bg-center text-white space-y-2"
        style={{ backgroundImage: `url(${bgSaldo})` }}
      >
        <h1 className="font-medium text-sm">Saldo anda</h1>
        <h1 className="font-medium text-2xl">Rp.</h1>
        <div className="flex items-center gap-3">
          <h1 className="font-medium text-xs">Lihat Saldo</h1>
          <Eye size={13} />
        </div>
      </div>
    </div>
  );
}
