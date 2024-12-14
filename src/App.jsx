import LandingPage from "./components/LandingPage";
const App = () => {
  return (
    <div className="bg-color-white min-h-screen w-full flex justify-center min-w-[375px]">
      <div className="relative max-w-[90rem] min-w-[375px] w-full lg:flex lg:p-10 lg:items-end overflow-hidden">
        <LandingPage />
      </div>
    </div>
  );
};

export default App;
