export const clampWithinRange = (value: number, min: number, max: number) =>
  value < min ? min : value > max ? max : value;
