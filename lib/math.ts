import random from "random";

export interface Range {
  min: number;
  max: number;
}
export interface PointRange {
  x: Range;
  y: Range;
}

export interface Point {
  x: number;
  y: number;
}

export interface Vector {
  x: number;
  y: number;
}

export interface Box {
  width: number;
  height: number;
}

export function scaleValue(value: number, rangeA: Range, rangeB: Range): number {
  return ((value - rangeA.min) / (rangeA.max - rangeA.min)) * (rangeB.max - rangeB.min) + rangeB.min;
}

export function scalePoint(point: Point, rangeA: PointRange, rangeB: PointRange): Point {
  return {
    x: scaleValue(point.x, rangeA.x, rangeB.x),
    y: scaleValue(point.y, rangeA.y, rangeB.y),
  };
}

export function randValue(range: Range): number {
  return random.float(range.min, range.max);
}

export function randPoint(range: PointRange): Point {
  return {
    x: randValue(range.x),
    y: randValue(range.y),
  };
}

export function clipValue(value: number, range: Range): number {
  if (value < range.min) return range.min;
  if (value > range.max) return range.max;
  return value;
}

export function clipPoint(point: Point, range: PointRange): Point {
  return {
    x: clipValue(point.x, range.x),
    y: clipValue(point.y, range.y),
  };
}
