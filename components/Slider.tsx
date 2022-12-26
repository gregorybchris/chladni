import { Slider as AntSlider } from "antd";
import { Range } from "../lib/math";

interface SliderProps {
  range: Range;
  defaultValue: number;
  onChange: (value: number) => void;
  stepSize: number;
}

export default function Slider(props: SliderProps) {
  return (
    <AntSlider
      step={props.stepSize}
      min={props.range.min}
      max={props.range.max}
      defaultValue={props.defaultValue}
      onAfterChange={(value: number) => props.onChange(value)}
    />
  );
}

Slider.defaultProps = {
  stepSize: 1,
};
