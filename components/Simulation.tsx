import { useRef, useState } from "react";
import Particle from "../lib/models/particle";
import World from "../lib/models/world";
import { Range, PointRange, clipPoint, clipValue, randPoint } from "../lib/math";
import random from "random";
import Graphics from "./Graphics";
import Controls from "./Controls";

interface SimulationProps {
  running: boolean;
  setRunning: (running: boolean) => void;
}

export interface SimulationParameters {
  a: number;
  b: number;
  n: number;
  m: number;
  z: number;
  o: number;
}

export interface SimulationParameterRanges {
  a: Range;
  b: Range;
  n: Range;
  m: Range;
  z: Range;
  o: Range;
}

const NUM_PARTICLES = 6000;

export default function Simulation(props: SimulationProps) {
  const [world, setWorld] = useState<World>(initWorld());
  const parameters = useRef<SimulationParameters>({
    a: 1,
    b: -1,
    n: 5,
    m: 2,
    z: 0.01,
    o: 1,
  });

  const paramRanges: SimulationParameterRanges = {
    a: { min: -3, max: 3 },
    b: { min: -3, max: 3 },
    n: { min: 1, max: 10 },
    m: { min: 1, max: 10 },
    z: { min: 0.001, max: 0.02 },
    o: { min: 0, max: 1 },
  };

  function initWorld(): World {
    const bounds = {
      x: { min: -100, max: 100 },
      y: { min: -100, max: 100 },
    };

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
    setWorld((world) => ({
      ...world,
      particles: world.particles.map((p) => updateParticle(p, world.bounds, deltaTime)),
    }));
  }

  function updateParticle(particle: Particle, bounds: PointRange, deltaTime: number): Particle {
    const { n, m, a, b, z, o } = parameters.current;
    const speed = 0.1;

    const f = (x: number, y: number) =>
      a * Math.sin(Math.PI * n * x * z) * Math.sin(Math.PI * m * y * z) +
      b * Math.sin(Math.PI * m * x * z) * Math.sin(Math.PI * n * y * z);
    const g = (x: number, y: number) => Math.abs(f(x, y));

    const { x, y } = particle.position;
    const rRange = { min: 0.1, max: 1 };
    const r = o ? clipValue(g(x, y) * deltaTime * speed, rRange) : rRange.max;

    const theta = random.float(0, 2 * Math.PI);
    const dx = r * Math.cos(theta);
    const dy = r * Math.sin(theta);
    const position = clipPoint({ x: x + dx, y: y + dy }, bounds);

    return {
      ...particle,
      position,
    };
  }

  function onUpdateParameter(param: string, value: number) {
    parameters.current = {
      ...parameters.current,
      [param]: value,
    };
  }

  return (
    <div className="flex justify-center">
      <Graphics running={props.running} onUpdate={onUpdate} world={world} />
      <Controls params={parameters.current} ranges={paramRanges} onUpdate={onUpdateParameter} />
    </div>
  );
}
