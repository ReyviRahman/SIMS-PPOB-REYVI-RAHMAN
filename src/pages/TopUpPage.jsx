import { useState } from "react";
import SaldoInformation from "../components/SaldoInformation";
import { Banknote } from "lucide-react";
import TransactionModal from "../components/TransactionModal";
import api from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { updateBalance } from "../redux/slices/authSlice";

export default function TopUpPage() {
  const [topUpAmount, setTopUpAmount] = useState("");
  const presets = [10000, 20000, 50000, 100000, 250000, 500000];

  const [showModal, setShowModal] = useState(false);
  const [statusModal, setStatusModal] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [messageModal, setMessageModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const currentBalance = useSelector((state) => state.auth.balance);

  const handleAmountChange = (e) => {
    const rawValue = e.target.value;

    const cleanValue = rawValue.replace(/[^0-9]/g, "");

    if (cleanValue) {
      const formatted = Number(cleanValue).toLocaleString("id-ID");
      setTopUpAmount(formatted);
    } else {
      setTopUpAmount("");
    }
  };

  const handlePresetClick = (amount) => {
    setTopUpAmount(amount.toLocaleString("id-ID"));
  };

  const handlePreSubmit = async (e) => {
    e.preventDefault();

    const numericAmount = Number(topUpAmount.replace(/\./g, ""));
    if (numericAmount < 10000) {
      setStatusModal("failed");
      setModalTitle("Top Up sebesar");
      setMessageModal("Minimal Top Up Rp10.000");
      setShowModal(true);
      return;
    }

    if (numericAmount > 1000000) {
      setStatusModal("failed");
      setModalTitle("Top Up sebesar");
      setMessageModal("Maksimal Top Up Rp1.000.000");
      setShowModal(true);
      return;
    }

    setStatusModal(null);
    setModalTitle("Anda yakin untuk Top Up sebesar");
    setMessageModal("Ya, lanjutkan Top Up");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setStatusModal(null);
  };

  const handleConfirmTopUp = async () => {
    setIsLoading(true);
    const numericAmount = Number(topUpAmount.replace(/\./g, ""));
    try {
      const payload = {
        top_up_amount: numericAmount
      }

      await api.post('/topup', payload);
      const newBalance = currentBalance + numericAmount;
      dispatch(updateBalance(newBalance))
      setStatusModal("success");
      setModalTitle("Top Up sebesar");
      setShowModal(true);
    } catch (error) {
      console.error('Error TopUp', error)
      setStatusModal("failed");
      setModalTitle("Top Up sebesar");
      setMessageModal(error.response?.data?.message || "Transaksi Gagal");
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-6 sm:px-20 px-4">
      <SaldoInformation />
      <div className="mt-10">
        <h1 className="text-lg font-medium">Silahkan masukan</h1>
        <h1 className="text-2xl font-semibold">Nominal Top Up</h1>
        <div className="flex sm:flex-row flex-col mt-10 gap-4">
          <form onSubmit={handlePreSubmit} className="grow space-y-4">
            <div className="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300">
              <div className={topUpAmount ? "text-black" : "text-gray-400"}>
                <Banknote size={15} />
              </div>
              <input
                id="topUpAmount"
                name="topUpAmount"
                type="text"
                placeholder="masukan nominal Top Up"
                value={topUpAmount}
                onChange={handleAmountChange}
                className="block min-w-0 grow bg-white py-2 pr-3 pl-1  text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                required
              />
            </div>
            <button
              disabled={topUpAmount === "" ? true : false}
              className={` w-full text-white rounded-md py-2 font-semibold ${
                topUpAmount === "" ? "bg-gray-400" : "bg-red-500 cursor-pointer"
              }`}
            >
              Top Up
            </button>
          </form>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {presets.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => handlePresetClick(amount)}
                className="cursor-pointer px-4 text-sm flex items-center justify-center sm:py-0 py-2 text-center outline-1 outline-gray-300 rounded-md"
              >
                Rp{amount.toLocaleString("id-ID")}
              </button>
            ))}
          </div>
        </div>
      </div>
      <TransactionModal
        isOpen={showModal}
        onClose={handleCloseModal}
        status={statusModal}
        message={messageModal}
        amount={topUpAmount}
        title={modalTitle}
        onConfirm={handleConfirmTopUp}
        isLoading={isLoading}
      />
    </div>
  );
}
