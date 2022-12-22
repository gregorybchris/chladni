import { useEffect, useState } from "react";
import Simulation from "../components/Simulation";

export default function HomePage() {
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setRunning(true);
    return () => setRunning(false);
  }, []);

  return (
    <div className="min-w-screen min-h-screen">
      <div className="p-4 mx-auto">
        <span className="flex justify-center py-6 text-2xl">resonate</span>
        <Simulation running={running} setRunning={setRunning} />
      </div>
    </div>
  );
}
