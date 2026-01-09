import { useState } from "react";
import SaldoInformation from "../components/SaldoInformation";
import { Banknote } from "lucide-react";

export default function TopUpPage() {
  const [topUpAmount, setTopUpAmount] = useState('');
  return (
    <div className="container mx-auto py-6 sm:px-20 px-4">
      <SaldoInformation />
      <div className="mt-10">
        <h1 className="text-lg font-medium">Silahkan masukan</h1>
        <h1 className="text-2xl font-semibold">Nominal Top Up</h1>
        <div className="flex sm:flex-row flex-col mt-10 gap-4">
          <div className="grow space-y-4">
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
                onChange={(e) => setTopUpAmount(e.target.value)}
                className="block min-w-0 grow bg-white py-2 pr-3 pl-1  text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                required
              />
            </div>
            <button className="bg-gray-400 w-full text-white rounded-md py-2 font-semibold cursor-pointer">
              Top Up
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="px-4 text-sm flex items-center justify-center sm:py-0 py-2 text-center outline-1 outline-gray-300 rounded-md">
              Rp.10.000
            </div>
            <div className="px-4 text-sm flex items-center text-center outline-1 justify-center sm:py-0 py-2 outline-gray-300 rounded-md">
              Rp.20.000
            </div>
            <div className="px-4 text-sm flex items-center text-center outline-1 justify-center sm:py-0 py-2 outline-gray-300 rounded-md">
              Rp.50.000
            </div>
            <div className="px-4 text-sm flex items-center text-center outline-1 justify-center sm:py-0 py-2 outline-gray-300 rounded-md">
              Rp.100.000
            </div>
            <div className="px-4 text-sm flex items-center text-center outline-1 justify-center sm:py-0 py-2 outline-gray-300 rounded-md">
              Rp.250.000
            </div>
            <div className="px-4 text-sm flex items-center text-center outline-1 justify-center sm:py-0 py-2 outline-gray-300 rounded-md">
              Rp.500.000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
