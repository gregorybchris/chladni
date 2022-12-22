import { useState } from "preact/hooks";
import Simulation from "../components/Simulation.tsx";
import Particle from "../lib/models/particle.ts";
import PointRange from "../lib/models/point-range.ts";
import World from "../lib/models/world.ts";

export default function Page() {
  const [running, setRunning] = useState(true);
  const [world, setWorld] = useState<World>({
    particles: [
      {
        position: { x: 20, y: 20 },
      },
    ],
    bounds: { x: { min: 0, max: 100 }, y: { min: 0, max: 100 } },
  });

  const onUpdate = (deltaTime: number) => {
    setWorld(updateWorld);
  };

  function moveParticle(particle: Particle, bounds: PointRange): Particle {
    // TODO: use bounds to update position
    return {
      position: {
        x: particle.position.x + 1,
        y: particle.position.y,
      },
    };
  }

  function updateWorld(world: World): World {
    // console.log("Updating world");
    const newParticles = world.particles.map((p) => moveParticle(p, world.bounds));

    return {
      ...world,
      particles: newParticles,
    };
  }

  return (
    <div class="w-30 h-30">
      <Simulation running={running} onUpdate={onUpdate} world={world} />
    </div>
  );
}
