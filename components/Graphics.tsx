import { useEffect, useRef, useState } from "react";
import World from "../lib/models/world";
import { useAnimationFrame } from "../lib/animation";
import { Color, colorToHex } from "../lib/color";
import Particle from "../lib/models/particle";
import { Point, PointRange, scalePoint } from "../lib/math";

interface GraphicsProps {
  running: boolean;
  onUpdate: (deltaTime: number) => void;
  world: World;
}

const GRAPHICS_BOUNDS: PointRange = {
  x: { min: 0, max: 600 },
  y: { min: 0, max: 450 },
};
const GRAPHICS_WIDTH = GRAPHICS_BOUNDS.x.max - GRAPHICS_BOUNDS.x.min;
const GRAPHICS_HEIGHT = GRAPHICS_BOUNDS.y.max - GRAPHICS_BOUNDS.y.min;

export default function Graphics(props: GraphicsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let graphicsViewPort = 0;
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
      <canvas className="rounded-3xl border-2 border-slate-600" ref={canvasRef}></canvas>
    </div>
  );
}
