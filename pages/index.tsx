import { useEffect, useState } from "react";
import Simulation from "../components/Simulation";

export default function HomePage() {
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setRunning(true);
    return () => setRunning(false);
  }, []);

  return (
    <div className="w-full h-full">
      <div>
        <div className="pt-8 pb-16">
          <a
            className="flex justify-center"
            href="https://en.wikipedia.org/wiki/Ernst_Chladni#Chladni_figures"
            target="_blank"
          >
            <div className="inline-block py-2 px-4 text-2xl">chladni</div>
          </a>
        </div>
        <Simulation running={running} setRunning={setRunning} />
      </div>
    </div>
  );
}
