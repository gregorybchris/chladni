import { Point, PointRange } from "../math";
import Particle from "./particle";

export default interface World {
  particles: Particle[];
  bounds: PointRange;
}

export function inWorldBounds(position: Point, world: World): boolean {
  if (position.x < world.bounds.x.min) return false;
  else if (position.x > world.bounds.x.max) return false;
  else if (position.y < world.bounds.y.min) return false;
  else if (position.y > world.bounds.y.max) return false;
  return true;
}
