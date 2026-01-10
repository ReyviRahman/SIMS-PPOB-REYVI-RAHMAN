import { useEffect, useState } from "react";
import SaldoInformation from "../components/SaldoInformation";
import api from "../services/api";
import BannerWidget from "../components/BannerWidget";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingBanner, setIsLoadingBanner] = useState(true);

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

    const fetchBanner = async () => {
      setIsLoadingBanner(true);
      try {
        const response = await api.get("/banner");
        setBanners(response.data.data);
      } catch (error) {
        console.error("Gagal Mengambil Data", error);
      } finally {
        setIsLoadingBanner(false);
      }
    };

    fetchServices();
    fetchBanner();
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
              <Link
                key={item.service_code}
                to={'/service'} 
                state={item}
                className="mt-2">
                <img
                  src={item.service_icon}
                  alt={item.service_name}
                  className="mx-auto"
                />
                <h1 className="text-center text-sm mt-2">
                  {item.service_name}
                </h1>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="px-4 sm:pl-31">
        <h1 className="font-medium">Temukan promo menarik</h1>
        {isLoadingBanner ? (
          <div className="text-center text-gray-500 mt-5">
            Memuat layanan...
          </div>
        ) : (
          <BannerWidget banners={banners} />
        )}
      </div>
    </div>
  );
}
