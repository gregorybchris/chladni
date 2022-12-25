import { useEffect, useRef } from "react";
import World from "../lib/models/world";
import { useAnimationFrame } from "../lib/hooks/animation";
import { Color, colorToHex } from "../lib/color";
import Particle from "../lib/models/particle";
import { Point, PointRange, scalePoint } from "../lib/math";

interface GraphicsProps {
  running: boolean;
  onUpdate: (deltaTime: number) => void;
  world: World;
}

const GRAPHICS_WIDTH = 600;
const GRAPHICS_HEIGHT = 450;
const GRAPHICS_BOUNDS: PointRange = {
  x: { min: 0, max: GRAPHICS_WIDTH },
  y: { min: 0, max: GRAPHICS_HEIGHT },
};

export default function Graphics(props: GraphicsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let graphicsViewPort: PointRange = {
    x: { min: -50, max: GRAPHICS_WIDTH + 50 },
    y: { min: -50, max: GRAPHICS_HEIGHT + 50 },
  };
  useAnimationFrame(props.onUpdate, props.running);

  useEffect(() => {
    resizeCanvas(GRAPHICS_WIDTH, GRAPHICS_HEIGHT);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!context) {
      console.error("Couldn't get graphics context");
      return;
    }

    renderScene(context);
  }, [props.world]);

  function resizeCanvas(width: number, height: number) {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Could not load canvas");
      return;
    }

    canvas.width = width;
    canvas.height = height;
  }

  function renderScene(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, GRAPHICS_WIDTH, GRAPHICS_HEIGHT);
    renderParticles(context);
  }

  function renderParticles(context: CanvasRenderingContext2D) {
    props.world.particles.forEach((particle: Particle) => {
      renderParticle(context, particle);
    });
  }

  function renderParticle(context: CanvasRenderingContext2D, particle: Particle) {
    const particleRadius = 2;
    const particleColor = Color.BLUE;

    const position = transformPosition(particle.position);
    context.beginPath();
    context.arc(position.x, position.y, particleRadius, 0, 2 * Math.PI);
    context.fillStyle = colorToHex(particleColor);
    context.fill();
  }

  function transformPosition(point: Point): Point {
    return scalePoint(point, props.world.bounds, GRAPHICS_BOUNDS);
  }

  return (
    <div className="w-full h-full flex justify-center">
      <canvas
        className="bg-gradient-to-tr from-zinc-800 to-zinc-700 shadow-[-10px_10px_60px_15px_rgba(0,0,0,0.5)]"
        ref={canvasRef}
      ></canvas>
    </div>
  );
}
