import { Range } from "../lib/math";
import { SimulationParameterRanges, SimulationParameters } from "./Simulation";
import Slider from "../widgets/Slider";

interface ControlsProps {
  onUpdate: (param: string, value: number) => void;
  params: SimulationParameters;
  ranges: SimulationParameterRanges;
}

export default function Controls(props: ControlsProps) {
  return (
    <div className="w-64 md:w-48 pl-12">
      <Control range={props.ranges.a} v={props.params.a} param="a" onChange={props.onUpdate} />
      <Control range={props.ranges.b} v={props.params.b} param="b" onChange={props.onUpdate} />
      <Control range={props.ranges.n} v={props.params.n} param="n" onChange={props.onUpdate} />
      <Control range={props.ranges.m} v={props.params.m} param="m" onChange={props.onUpdate} />
      <Control range={props.ranges.z} v={props.params.z} param="z" onChange={props.onUpdate} stepSize={0.001} />
      <Control range={props.ranges.o} v={props.params.o} param="o" onChange={props.onUpdate} />
    </div>
  );
}

interface ControlProps {
  range: Range;
  v: number;
  param: string;
  stepSize?: number;
  onChange: (param: string, v: number) => void;
}

function Control({ range, v, param, stepSize, onChange }: ControlProps) {
  return (
    <div className="flex items-center">
      <div className="align-middle pr-3">{param}</div>
      <div className="align-middle w-64 md:w-32">
        <Slider range={range} defaultValue={v} onChange={(v: number) => onChange(param, v)} stepSize={stepSize} />
      </div>
    </div>
  );
}
