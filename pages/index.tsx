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
        <span className="flex justify-center py-8 pb-16 text-2xl">resonate</span>
        <Simulation running={running} setRunning={setRunning} />
      </div>
    </div>
  );
}
