import SaldoInformation from "../components/SaldoInformation";


export default function HomePage() {
  return (
    <div>
      <div className="container mx-auto py-6 sm:px-20 px-4">
        <SaldoInformation />
        <div className="grid grid-cols-2 sm:grid-cols-12 mt-10">
          <div>
            <h1 className="font-medium">PBB</h1>
          </div>
        </div>
      </div>
      <div className="pl-31">
        <h1 className="font-medium">Temukan promo menarik</h1>
      </div>
    </div>
  );
}
