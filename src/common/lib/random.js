export const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const randomColor = () =>
  `hsl(${randomInt(0, 360)},${randomInt(42, 98)}%,${randomInt(40, 90)}%)`;

export const sample = (arr) => arr[randomInt(0, arr.length - 1)];
