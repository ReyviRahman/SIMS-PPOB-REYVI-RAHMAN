import { useEffect, useState } from "react";
import SaldoInformation from "../components/SaldoInformation";
import api from "../services/api";

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");
        setServices(response.data.data);
      } catch (error) {
        console.error("Gagal ngambil data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div>
      <div className="container mx-auto py-6 sm:px-20 px-4">
        <SaldoInformation />
        {isLoading ? (
          <div className="mt-10 text-center text-gray-500">
            Memuat layanan...
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-12 mt-10">
            {services.map((item) => (
              <div className="mt-2">
                <img src={item.service_icon} alt={item.service_name} className="mx-auto" />
                <h1 className="text-center text-sm mt-2">{item.service_name}</h1>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="pl-31">
        <h1 className="font-medium">Temukan promo menarik</h1>
      </div>
    </div>
  );
}
