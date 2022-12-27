import { useEffect, useRef, useState } from "react";
import World from "../lib/models/world";
import { useAnimationFrame } from "../lib/hooks/animation";
import { Color, colorToHex } from "../lib/color";
import Particle from "../lib/models/particle";
import { Box, PointRange, scalePoint } from "../lib/math";

interface GraphicsProps {
  running: boolean;
  onUpdate: (deltaTime: number) => void;
  world: World;
}

export default function Graphics(props: GraphicsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState<Box>({ width: 0, height: 0 });
  useAnimationFrame(props.onUpdate, props.running);

  useEffect(() => {
    console.log("Adding event listeners for resize");

    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Couldn't get canvas");
      return;
    }

    const observer = new ResizeObserver(() => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      setCanvasSize({
        width: canvas.clientWidth,
        height: canvas.clientHeight,
      });
    });
    observer.observe(canvas);
    return () => observer.unobserve(canvas);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!context) {
      console.error("Couldn't get graphics context");
      return;
    }

    renderScene(context);
  }, [props.world, canvasSize]);

  function renderScene(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, canvasSize.width, canvasSize.height);
    props.world.particles.forEach((particle: Particle) => {
      renderParticle(context, particle);
    });
  }

  function renderParticle(context: CanvasRenderingContext2D, particle: Particle) {
    const particleRadius = 1;
    const particleColor = Color.BLUE;

    const GRAPHICS_BOUNDS: PointRange = {
      x: { min: 0, max: canvasSize.width },
      y: { min: 0, max: canvasSize.height },
    };
    const position = scalePoint(particle.position, props.world.bounds, GRAPHICS_BOUNDS);
    context.beginPath();
    context.arc(position.x, position.y, particleRadius, 0, 2 * Math.PI);
    context.fillStyle = colorToHex(particleColor);
    context.fill();
  }

  return (
    <div className="w-full mx-8 h-96 md:mx-0 md:w-1/2 md:h-96 mb-10">
      <canvas
        className="w-full h-full block bg-gradient-to-tr from-zinc-800 to-zinc-700 shadow-[-10px_10px_60px_15px_rgba(0,0,0,0.5)]"
        ref={canvasRef}
      />
    </div>
  );
}
