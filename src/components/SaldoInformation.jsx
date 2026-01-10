import { useDispatch, useSelector } from "react-redux";
import bgSaldo from "../assets/bg-saldo.png";
import defaultProfile from "../assets/profile-photo.png";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { getBalance, getProfile } from "../redux/slices/authSlice";

export default function SaldoInformation() {
  const dispatch = useDispatch();
  const { user, balance, isProfileLoading, isBalanceLoading } = useSelector(
    (state) => state.auth
  );
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    }
    if (balance === null) {
      dispatch(getBalance());
    }
  }, [dispatch, user, balance]);
  return (
    <div className="flex sm:flex-row flex-col gap-4">
      <div className="flex-1">
        {isProfileLoading ? (
          <div className="animate-pulse flex flex-col gap-2">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-6 w-48 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <>
            <img
              src={user?.profile_image && !user.profile_image.includes("/null") ? user.profile_image : defaultProfile}
              alt="Profile Photo"
              className="w-17 h-17 rounded-full"
            />
            <div className="mt-3">
              <h1 className="text-lg font-medium">Selamat datang,</h1>
              <h1 className="text-2xl font-semibold">{user && `${user.first_name} ${user.last_name}`}</h1>
            </div>
          </>
        )}
      </div>
      <div
        className="p-6 grow rounded-xl bg-cover bg-center text-white space-y-2"
        style={{ backgroundImage: `url(${bgSaldo})` }}
      >
        <h1 className="font-medium text-sm">Saldo anda</h1>
        <h1 className="font-medium text-2xl">
          {isBalanceLoading ? (
            <span className="text-sm font-normal animate-pulse">Memuat saldo...</span>
          ) : (
            `Rp ${showBalance ? (balance.toLocaleString('id-ID')) : '•••••••'}`
          )}
        </h1>
        <div className="flex items-center gap-3">
          <h1 className="font-medium text-xs">Lihat Saldo</h1>
          <div className="cursor-pointer"
            onClick={() => setShowBalance(!showBalance)}>
            {showBalance ? (
              <EyeOff size={13} />
            ) : (
              <Eye size={13} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
