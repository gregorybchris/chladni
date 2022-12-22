import { useState } from "react";
import Particle from "../lib/models/particle";
import World from "../lib/models/world";
import { PointRange, clipPoint, randPoint } from "../lib/math";
import random from "random";
import Graphics from "./Graphics";

interface SimulationProps {
  running: boolean;
  setRunning: (running: boolean) => void;
  numParticles: number;
}

export default function Simulation(props: SimulationProps) {
  const [world, setWorld] = useState<World>(initializeWorld());

  function initializeWorld(): World {
    const bounds = {
      x: { min: -100, max: 100 },
      y: { min: -100, max: 100 },
    };

    const particles = [];
    for (let i = 0; i < props.numParticles; i++) {
      const particle: Particle = {
        position: randPoint(bounds),
      };
      particles.push(particle);
    }

    return {
      particles,
      bounds,
    };
  }

  function onUpdate(deltaTime: number) {
    setWorld((world) => updateWorld(world, deltaTime));
  }

  function updateWorld(world: World, deltaTime: number): World {
    const newParticles = world.particles.map((p) => updateParticle(p, world.bounds, deltaTime));

    return {
      ...world,
      particles: newParticles,
    };
  }

  function updateParticle(particle: Particle, bounds: PointRange, deltaTime: number): Particle {
    const position = clipPoint(
      {
        x: particle.position.x + random.float(-1, 1),
        y: particle.position.y + random.float(-1, 1),
      },
      bounds
    );

    return {
      ...particle,
      position,
    };
  }

  return (
    <div>
      <Graphics running={props.running} onUpdate={onUpdate} world={world} />
    </div>
  );
}

Simulation.defaultProps = {
  numParticles: 500,
};
