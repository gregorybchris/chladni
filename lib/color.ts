export enum Color {
  BLACK = "black",
  BLUE = "blue",
  BROWN = "brown",
  CYAN = "cyan",
  GREEN = "green",
  GREY = "grey",
  PINK = "pink",
  PURPLE = "purple",
  RED = "red",
  WHITE = "white",
  YELLOW = "yellow",
}

export const colorToHex = (color: Color) => {
  switch (color) {
    case Color.BLACK:
      return "#181620";
    case Color.BLUE:
      return "#3498db";
    case Color.BROWN:
      return "#5d3c25";
    case Color.CYAN:
      return "#00d2d3";
    case Color.GREEN:
      return "#2ecc71";
    case Color.GREY:
      return "#8395a7";
    case Color.PINK:
      return "#f368e0";
    case Color.PURPLE:
      return "#9b59b6";
    case Color.RED:
      return "#e74c3c";
    case Color.YELLOW:
      return "#f1c40f";
    case Color.WHITE:
      return "#f0f0f0";
    default:
      return "#ffffff";
  }
};
