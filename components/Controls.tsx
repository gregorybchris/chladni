import { SimulationParameterRanges, SimulationParameters } from "./Simulation";
import Slider from "./Slider";

interface ControlsProps {
  onUpdateParameter: (param: string, value: number) => void;
  parameters: SimulationParameters;
  ranges: SimulationParameterRanges;
}

export default function Controls(props: ControlsProps) {
  return (
    <div className="w-48 pl-12">
      <Slider
        range={props.ranges.n}
        defaultValue={props.parameters.n}
        onChange={(value: number) => props.onUpdateParameter("n", value)}
      />
      <Slider
        range={props.ranges.m}
        defaultValue={props.parameters.m}
        onChange={(value: number) => props.onUpdateParameter("m", value)}
      />
      <Slider
        range={props.ranges.a}
        defaultValue={props.parameters.a}
        onChange={(value: number) => props.onUpdateParameter("a", value)}
      />
      <Slider
        range={props.ranges.b}
        defaultValue={props.parameters.b}
        onChange={(value: number) => props.onUpdateParameter("b", value)}
      />
      <Slider
        range={props.ranges.zoom}
        defaultValue={props.parameters.zoom}
        onChange={(value: number) => props.onUpdateParameter("zoom", value)}
        stepSize={0.001}
      />
      <Slider
        range={props.ranges.speed}
        defaultValue={props.parameters.speed}
        onChange={(value: number) => props.onUpdateParameter("speed", value)}
        stepSize={0.1}
      />
    </div>
  );
}
