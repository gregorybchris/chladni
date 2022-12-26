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
  n: number;
  m: number;
  a: number;
  b: number;
  zoom: number;
  speed: number;
}

export interface SimulationParameterRanges {
  n: Range;
  m: Range;
  a: Range;
  b: Range;
  zoom: Range;
  speed: Range;
}

const NUM_PARTICLES = 6000;

export default function Simulation(props: SimulationProps) {
  const [world, setWorld] = useState<World>(initWorld());
  const parameters = useRef<SimulationParameters>({
    n: 5,
    m: 2,
    a: 1,
    b: -1,
    zoom: 0.01,
    speed: 0.1,
  });

  const paramRanges: SimulationParameterRanges = {
    n: { min: 1, max: 20 },
    m: { min: 1, max: 20 },
    a: { min: -3, max: 3 },
    b: { min: -3, max: 3 },
    zoom: { min: 0.001, max: 0.02 },
    speed: { min: 0.0, max: 0.2 },
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
    const { n, m, a, b, zoom, speed } = parameters.current;

    const f = (x: number, y: number) =>
      a * Math.sin(Math.PI * n * x * zoom) * Math.sin(Math.PI * m * y * zoom) +
      b * Math.sin(Math.PI * m * x * zoom) * Math.sin(Math.PI * n * y * zoom);
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

  function onUpdateParameter(param: string, value: number) {
    parameters.current = {
      ...parameters.current,
      [param]: value,
    };
  }

  return (
    <div className="flex justify-center">
      <Graphics running={props.running} onUpdate={onUpdate} world={world} />
      <Controls parameters={parameters.current} ranges={paramRanges} onUpdateParameter={onUpdateParameter} />
    </div>
  );
}
