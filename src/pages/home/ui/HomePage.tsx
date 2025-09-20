import { CountWidget } from "@/widgets/dashboard";

function HomePage() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      <div className="w-full h-full max-w-[1400px]">
        <CountWidget />
      </div>      
    </div>
  );
};

export default HomePage;