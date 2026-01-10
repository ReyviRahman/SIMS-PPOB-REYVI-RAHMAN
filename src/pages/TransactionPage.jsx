import { useEffect, useState } from "react";
import SaldoInformation from "../components/SaldoInformation";
import api from "../services/api";

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const limit = 5;

  const fetchHistory = async (currentOffset) => {
    setIsLoading(true);
    try {
      const response = await api.get("/transaction/history", {
        params: {
          offset: currentOffset,
          limit: limit,
        },
      });

      const newRecords = response.data.data.records;
      setTransactions((prevData) => {
        if (currentOffset === 0) return newRecords;
        return [...prevData, ...newRecords];
      });

      if (newRecords.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Gagal Mengambil Data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(0);
  }, []);

  const handleShowMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchHistory(newOffset);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return (
      new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
        .format(date)
        .replace("pukul ", "") // 1. Hapus kata "pukul"
        .replace(".", ":") + // 2. Ganti titik (.) jadi titik dua (:)
      " WIB"
    );
  };

  return (
    <div className="container mx-auto py-6 sm:px-20 px-4">
      <SaldoInformation />
      <h1 className="text-lg font-semibold mt-10">Semua Transaksi</h1>
      {transactions.map((item) => {
        const isTopUp = item.transaction_type === "TOPUP";
        const colorClass = isTopUp ? "text-green-500" : "text-red-500";
        const sign = isTopUp ? "+" : "-";

        return (
          <div className="outline-1 outline-gray-300 rounded-md px-4 py-2 flex justify-between mt-4">
            <div>
              <h1 className={`text-xl ${colorClass} font-medium`}>
                {sign} Rp.{item.total_amount.toLocaleString("id-ID")}
              </h1>
              <h1 className="text-xs text-gray-400 mt-1">
                {formatDate(item.created_on)}
              </h1>
            </div>
            <div>
              <h1 className="text-sm mt-1">{item.description}</h1>
            </div>
          </div>
        );
      })}

      {hasMore && (
        <div className="flex justify-center">
          <button className="text-center mt-4 font-medium text-red-500 cursor-pointer disabled:opacity-50 disabled:cursor-default"
            onClick={handleShowMore}
            disabled={isLoading}>
            {isLoading ? "Loading..." : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
}
