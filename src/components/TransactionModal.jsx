import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { CircleCheck, CircleX } from "lucide-react";

export default function TransactionModal({ isOpen, onClose, status, message, amount, title, onConfirm, isLoading }) {
  if (!isOpen) return null;
  const handleBackdropCLick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40  transition-opacity fade-in"
      onClick={handleBackdropCLick}
    >
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm flex flex-col items-center justify-center text-center shadow-2xl animate-fade-in-up">
        {status === null && (
          <div>
            <img src={logo} alt="Logo Modal" className="mx-auto w-15 h-15" />
            <h1 className="text-base mt-3">{title}</h1>
            <h1 className="font-semibold text-2xl">Rp{amount} ?</h1>
            <div>
              <button 
                onClick={onConfirm}
                disabled={isLoading}
                className="mt-3 text-red-600 font-medium cursor-pointer">
                {isLoading ? "Sedang Memproses..." : message}
              </button>
            </div>
            <div>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="mt-3 text-gray-400 font-medium cursor-pointer"
              >
                Batalkan
              </button>
            </div>
          </div>
        )}
        {status === 'success' && (
          <div>
            <CircleCheck className="mx-auto w-15 h-15 text-green-600" />
            <h1 className="text-base mt-3">{title}</h1>
            <h1 className="font-semibold text-2xl">Rp{amount}</h1>
            <h1 className="text-base mt-3">berhasil!</h1>
            <div className="mt-3">
              <Link
                to={'/'}
                className=" text-red-600 font-medium cursor-pointer"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        )}
        {status === 'failed' && (
          <div>
            <CircleX className="mx-auto w-15 h-15 text-red-600" />
            <h1 className="text-base mt-3">{title}</h1>
            <h1 className="font-semibold text-2xl">Rp{amount}</h1>
            <h1 className="text-base mt-3">gagal</h1>
            <h1 className="text-sm text-red-600">{message}</h1>
            <div className="mt-3">
              <Link
                to={'/'}
                className=" text-red-600 font-medium cursor-pointer"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
