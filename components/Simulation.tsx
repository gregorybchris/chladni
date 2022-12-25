import { useState } from "react";
import Particle from "../lib/models/particle";
import World from "../lib/models/world";
import { PointRange, clipPoint, clipValue, randPoint } from "../lib/math";
import random from "random";
import Graphics from "./Graphics";

interface SimulationProps {
  running: boolean;
  setRunning: (running: boolean) => void;
}

interface SimulationParameters {
  speed: number;
  n: number;
  m: number;
  a: number;
  b: number;
  w: number;
}

export default function Simulation(props: SimulationProps) {
  const [world, setWorld] = useState<World>(initWorld());
  const [parameters, setParameters] = useState<SimulationParameters>(initParameters());

  function initParameters(): SimulationParameters {
    return {
      speed: 0.1,
      n: 7,
      m: 2,
      a: 1,
      b: -1,
      w: 0.01,
    };
  }

  function initWorld(): World {
    const bounds = {
      x: { min: -100, max: 100 },
      y: { min: -100, max: 100 },
    };

    const NUM_PARTICLES = 3000;
    const particles = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
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
    return {
      ...world,
      particles: world.particles.map((p) => updateParticle(p, world.bounds, deltaTime)),
    };
  }

  function updateParticle(particle: Particle, bounds: PointRange, deltaTime: number): Particle {
    const { n, m, a, b, w, speed } = parameters;

    const f = (x: number, y: number) =>
      a * Math.sin(Math.PI * n * x * w) * Math.sin(Math.PI * m * y * w) +
      b * Math.sin(Math.PI * m * x * w) * Math.sin(Math.PI * n * y * w);
    const g = (x: number, y: number) => Math.abs(f(x, y));

    const { x, y } = particle.position;
    const rRange = { min: 0.1, max: 1 };
    const r = clipValue(g(x, y) * deltaTime * speed, rRange);

    const theta = random.float(0, 2 * Math.PI);
    const dx = r * Math.cos(theta);
    const dy = r * Math.sin(theta);
    const position = clipPoint({ x: x + dx, y: y + dy }, bounds);

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
