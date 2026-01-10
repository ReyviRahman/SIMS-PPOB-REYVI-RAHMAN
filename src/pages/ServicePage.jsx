import { useLocation } from "react-router-dom";
import SaldoInformation from "../components/SaldoInformation";
import { Banknote } from "lucide-react";
import TransactionModal from "../components/TransactionModal";
import { useState } from "react";
import api from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { updateBalance } from "../redux/slices/authSlice";

export default function ServicePage() {
  const location = useLocation();
  const serviceData = location.state;

  const [showModal, setShowModal] = useState(false);
  const [statusModal, setStatusModal] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [messageModal, setMessageModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const currentBalance = useSelector((state) => state.auth.balance);

  const handleCloseModal = () => {
    setShowModal(false);
    setStatusModal(null);
  };

  const handlePreSubmit = () => {
    setStatusModal(null);
    setModalTitle(`Beli ${serviceData.service_name} senilai`);
    setMessageModal("Ya, lanjutkan Bayar");
    setShowModal(true);
  };

  const handleConfirmPay = async () => {
    setIsLoading(true);
    try {
      await api.post("/transaction", {
        service_code: serviceData.service_code,
      });
      
      const newBalance = currentBalance - serviceData.service_tariff;
      dispatch(updateBalance(newBalance));
      setStatusModal("success");
      setModalTitle(`Pembayaran ${serviceData.service_name} sebesar`);
      setShowModal(true);
    } catch (error) {
      console.error("Error Pembayaran", error);
      setStatusModal("failed");
      setModalTitle("Pembayaran sebesar");
      setMessageModal(error.response?.data?.message || "Transaksi Gagal");
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 sm:px-20 px-4">
      <SaldoInformation />
      <h1 className="text-lg font-medium mt-10">Pembayaran</h1>
      <div className="flex gap-2 items-center mt-2">
        <img
          src={serviceData.service_icon}
          alt={serviceData.service_name}
          width={20}
          height={20}
        />
        <h1 className="font-medium">{serviceData.service_name}</h1>
      </div>
      <div className="flex items-center border border-gray-300 mt-8 rounded gap-2 px-4 py-2">
        <Banknote size={18} />
        <h1 className="font-medium">
          {serviceData.service_tariff.toLocaleString("id-ID")}
        </h1>
      </div>
      <div className="mt-4">
        <button
          onClick={handlePreSubmit}
          className="bg-red-600 w-full text-white rounded-md py-2 font-semibold cursor-pointer"
        >
          Bayar
        </button>
      </div>

      <TransactionModal
        isOpen={showModal}
        onClose={handleCloseModal}
        status={statusModal}
        message={messageModal}
        amount={serviceData.service_tariff.toLocaleString("id-ID")}
        title={modalTitle}
        onConfirm={handleConfirmPay}
        isLoading={isLoading}
      />
    </div>
  );
}
