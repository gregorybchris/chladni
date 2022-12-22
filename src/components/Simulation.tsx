import { useState, useRef, useEffect } from "preact/hooks";
import { useAnimationFrame } from "../lib/animation.ts";
import { Color, colorToHex } from "../lib/color.ts";
import Particle from "../lib/models/particle.ts";
import Box from "../lib/models/box.ts";
import World from "../lib/models/world.ts";

interface SimulationProps {
  running: boolean;
  onUpdate: (deltaTime: number) => void;
  world: World;
}

export default function Simulation(props: SimulationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState<Box>({ width: 0, height: 0 });

  useAnimationFrame(props.onUpdate, props.running);

  useEffect(() => {
    resetCanvasSize();
  }, []);

  useEffect(() => {
    self.addEventListener("resize", resetCanvasSize);
    return () => self.removeEventListener("resize", resetCanvasSize);
  }, []);

  useEffect(() => {
    resizeCanvas();
  }, [canvasSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context) {
      renderScene(context);
    }
  }, [props.world]);

  function resetCanvasSize() {
    const canvas = canvasRef.current;
    if (canvas) {
      const boundingRect = canvas.getBoundingClientRect();
      setCanvasSize({
        width: boundingRect.width,
        height: boundingRect.height,
      });
    }
  }

  function resizeCanvas() {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvasSize.width;
      canvas.height = canvasSize.height;
    }
  }

  function renderScene(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, canvasSize.width, canvasSize.height);
    renderParticles(context);
  }

  function renderParticles(context: CanvasRenderingContext2D) {
    const particleRadius = 5;
    const particleColor = Color.BLACK;

    props.world.particles.forEach((particle: Particle) => {
      const position = particle.position;
      context.beginPath();
      context.arc(position.x, position.y, particleRadius, 0, 2 * Math.PI);
      context.fillStyle = colorToHex(particleColor);
      context.fill();
    });
  }

  return (
    <div class="flex gap-2 w-full">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
