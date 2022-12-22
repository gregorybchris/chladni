import Particle from "./particle.ts";
import Point from "./point.ts";
import PointRange from "./point-range.ts";

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
