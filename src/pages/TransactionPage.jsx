import SaldoInformation from "../components/SaldoInformation";

export default function TransactionPage() {
  return (
    <div className="container mx-auto py-6 sm:px-20 px-4">
      <SaldoInformation />
      <h1 className="text-lg font-semibold mt-10">Semua Transaksi</h1>
      <div className="outline-1 outline-gray-300 rounded-md px-4 py-2 flex justify-between mt-4">
        <div>
          <h1 className="text-xl text-green-500 font-medium">+ Rp.10.000</h1>
          <h1 className="text-xs text-gray-400 mt-1">17 Agustus 2023 <span className="ms-2">13:30 WIB</span> </h1>
        </div>
        <div>
          <h1 className="text-sm mt-1">Top Up Saldo</h1>
        </div>
      </div>
      <div className="outline-1 outline-gray-300 rounded-md px-4 py-2 flex justify-between mt-4">
        <div>
          <h1 className="text-xl text-red-500 font-medium">- Rp.40.000</h1>
          <h1 className="text-xs text-gray-400 mt-1">17 Agustus 2023 <span className="ms-2">12:20 WIB</span> </h1>
        </div>
        <div>
          <h1 className="text-sm mt-1">Pulsa Prabayar</h1>
        </div>
      </div>
      <h1 className="text-center mt-4 font-medium text-red-500">Show More</h1>
    </div>
  );
}
